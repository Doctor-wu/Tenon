import { reactive, ref, toRaw } from "vue";
import { createPropsBySchemas } from "../schema";
import { getID, releaseID } from "./id";
import { ComponentSerializeConfig, ComponentTreeNode } from "./component.interface";
import { IMaterial } from "@tenon/materials";
import { cloneDeep } from "lodash";
import { ITenonComponentStates } from "../states";
import { createTenonEvents, IEventMeta, IEventsConfig } from "../events";
import { TenonPropsBinding } from "../props-binding";
import { TenonLifeCycleHook } from "../hooks/lifecycle";
import { StaticHooksKey, TenonStaticHook } from "../hooks";
import { TenonEventCalledHook } from "../hooks/event-called";

export class TenonComponent implements ComponentTreeNode {
  public name!: string;
  public id: number;
  public schemas: any;
  public parent?: TenonComponent;
  refs:any = {}; // 引用
  public material: IMaterial;
  public materialConfig: IMaterial['config'];
  public states?: ITenonComponentStates;
  public props?: any;
  public propsBinding!: TenonPropsBinding;
  public runtimeBinding: Record<string, any> = {};
  public children?: TenonComponent[];
  public slots!: Record<string, TenonComponent>;
  public ctx?: any;
  public isSlot?: boolean;
  public handlers: string[] = [];
  public events!: IEventsConfig;
  public lifecycleHook!: TenonLifeCycleHook;
  public eventCalledHook!: TenonEventCalledHook;
  public mounted = false;
  public el!: HTMLElement;
  public vueInstance: any;
  
  public exec = (expression, ...args: any[]) => TenonComponent._exec(this, expression, ...args);
  
  static materialsMap: Map<string, () => IMaterial>;

  static _exec: (instance: TenonComponent, expression: string, ...args: any[]) => void;

  static customConfig: any = {};

  static editMode: any;

  static eventsMap?: Map<string, IEventMeta>;

  static staticHook: TenonStaticHook = new TenonStaticHook();

  static createInstanceByDeserialize(
    config: ComponentSerializeConfig, materialsMap: Map<string, () => IMaterial>
  ): TenonComponent | null {
    const compFactory = materialsMap.get(config.name);
    if (!compFactory) return null;
    const material = compFactory();
    const instance = new TenonComponent(material);
    if (config.children) {
      instance.children = config.children.map(
        childConfig => {
          const childInstance = TenonComponent.createInstanceByDeserialize(childConfig, materialsMap)!;
          childInstance.parent = instance;
          return toRaw(childInstance);
        }
      );
    }
    Object.keys(config.slots || {}).forEach(slotKey => {
      instance.slots[slotKey] = TenonComponent.createInstanceByDeserialize(config.slots[slotKey], materialsMap)!;
      instance.slots[slotKey].parent = instance;
    });

    if (config.events) {
      instance.events = config.events;
    }

    instance.propsBinding = TenonPropsBinding.createInstanceByDeserialize(config.propsBinding || '{}', instance);

    TenonComponent.staticHook.executeHook(StaticHooksKey.afterDeserialize, instance);

    Object.assign(instance, config, {
      slots: instance.slots,
      children: instance.children,
      propsBinding: instance.propsBinding,
    });
    return instance;
  }

  constructor(material: IMaterial, options: {
    parent?: TenonComponent;
    props?: any;
  } = {}) {
    this.id = getID();
    this.parent = options.parent;
    this.name = material.name;
    this.material = material;
    this.materialConfig = material.config;
    this.schemas = material.schemas;
    this.initHooks();
    this.initEvents();
    this.initProps(material.schemas, options.props);
    this.initSlots();
    if (material.config.nestable) this.children = [];
    const instance = reactive(this);
    return instance;
  }


  get tenonCompProps() {
    return this.vueInstance.props.tenonCompProps || {};
  }

  set tenonCompProps(value) {
    this.vueInstance.props.tenonCompProps = value;
  }

  initHooks() {
    this.initLifeCycle();
    this.eventCalledHook = new TenonEventCalledHook();
  }

  initLifeCycle() {
    this.lifecycleHook = new TenonLifeCycleHook();
    this.lifecycleHook.onBeforeUnmount(() => {
      Object.keys(this.runtimeBinding).forEach(key => {
        this.runtimeBinding[key]();
      });
    });
    this.lifecycleHook.onMounted(() => {
      if (this.ctx) {
        this.el = this.ctx.$el;
      }
      this.mounted = true;
    });
  }


  initEvents() {
    this.events = createTenonEvents(this.material);
  }

  initProps(schemas, source) {
    this.props = createPropsBySchemas(
      schemas,
      Object.assign({}, this.material?.config?.tenonProps, source || {})
    );
    if (this.name === 'If') {
      this.props.IfConfig.render = true;
    }
    this.propsBinding = new TenonPropsBinding(this);
  }

  initSlots() {
    this.slots = {};
  }

  clone() {
    const instance = new TenonComponent(this.material, {
      parent: this.parent,
      props: cloneDeep(this.props),
    });
    instance.schemas = cloneDeep(this.schemas);
    instance.material = cloneDeep(this.material);
    instance.events = cloneDeep(this.events);
    Object.keys(this.slots).forEach(slotKey => {
      instance.slots[slotKey] = this.slots[slotKey].clone();
    });
    instance.propsBinding = this.propsBinding.clone(instance);
    if (this.children) {
      instance.children = this.children.map(child => {
        const childInstance = child.clone();
        childInstance.parent = instance;
        return childInstance;
      });
    };
    return instance;
  }

  destroy() {
    // debugger;
    Object.keys(this.runtimeBinding).forEach(key => {
      this.runtimeBinding[key]();
    });
    releaseID(this.id);
    Object.keys(this.slots).forEach(slotKey => {
      this.slots[slotKey].destroy();
    });
    this.children?.forEach(child => child.destroy());
    setTimeout(() => {
      let originThis = toRaw(this);
      originThis.props = undefined;
      originThis.children = undefined;

      if (originThis?.ctx?.tenonComp) {
        originThis.ctx.tenonComp = null;
      }
      originThis.ctx = undefined;
      originThis.parent = undefined;
      // @ts-ignore
      originThis.lifecycleHook = undefined;
      // @ts-ignore
      originThis.propsBinding = undefined;
      // @ts-ignore
      originThis.runtimeBinding = undefined;
      // @ts-ignore
      originThis.material = undefined;
      // @ts-ignore
      originThis.schemas = undefined;
      // @ts-ignore
      originThis.events = undefined;
      // @ts-ignore
      originThis.handlers = undefined;
      originThis.states = undefined;
      originThis.materialConfig = undefined;
      // @ts-ignore
      originThis.slots = undefined;
    }, 0);
  }

  serialize(): ComponentSerializeConfig {
    const newConfig: ComponentSerializeConfig = {} as ComponentSerializeConfig;
    newConfig.id = this.id;
    newConfig.name = this.name;
    if (this.props) {
      newConfig.props = cloneDeep(this.props);
    }
    if (this.propsBinding) {
      newConfig.propsBinding = this.propsBinding.serialize();
    }
    if (this.schemas) {
      newConfig.schemas = toRaw(this.schemas);
    }
    if (this.children) {
      newConfig.children = this.children.map(child => {
        return child.serialize();
      });
    }
    if (this.events) {
      newConfig.events = toRaw(this.events);
    }
    if (this.slots) {
      const oldSlots = toRaw(this.slots);
      newConfig.slots = {};
      Object.keys(oldSlots).forEach(key => {
        newConfig.slots[key] = oldSlots[key].serialize();
      });
    }
    return newConfig;
  }

  onBeforeMount(cb: Function) {

  }
}


export const createTenonComponent =
  (material: IMaterial, parent: TenonComponent | undefined = undefined, options: any = {}): TenonComponent => {
    const {
      props,
      slots,
      isSlot,
      schemas,
    } = options;

    return new TenonComponent(material, {
      parent,
      props,
    });
  }

