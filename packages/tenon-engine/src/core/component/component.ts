import { reactive, toRaw } from "vue";
import { createPropsBySchemas } from "../schema";
import { getID } from "./id";
import { ComponentSerializeConfig, ComponentTreeNode } from "./component.interface";
import { IMaterial } from "@tenon/materials";
import { cloneDeep } from "lodash";
import { ITenonComponentStates } from "../states";
import { createTenonEvents, IEventMeta, IEventsConfig } from "../events";
import { TenonPropsBinding } from "../props-binding";
import { TenonLifeCycleHook } from "../hooks/lifecycle";
import { StaticHooksKey, TenonStaticHook } from "../hooks";

export class TenonComponent implements ComponentTreeNode {
  public name!: string;
  public id: number;
  public schemas: any;
  public parent?: TenonComponent;
  public material: IMaterial;
  public materialConfig: IMaterial['config'];
  public states?: ITenonComponentStates;
  public props?: any;
  public propsBinding: TenonPropsBinding;
  public runtimeBinding: Record<string, any> = {};
  public children?: TenonComponent[];
  public slots!: Record<string, TenonComponent>;
  public ctx?: any;
  public isSlot?: boolean;
  public handlers: string[] = [];
  public events!: IEventsConfig;
  public lifecycleHook!: TenonLifeCycleHook;

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

    instance.propsBinding = TenonPropsBinding.createInstanceByDeserialize(config.propsBinding || '{}');

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
    this.initLifeCycle();
    this.initEvents();
    this.initProps(material.schemas, options.props);
    this.initSlots();
    this.propsBinding = new TenonPropsBinding();
    if (material.config.nestable) this.children = [];
    return reactive(this);
  }


  get tenonCompProps() {
    return this.ctx?.tenonCompProps;
  }

  initLifeCycle() {
    this.lifecycleHook = new TenonLifeCycleHook();
    this.lifecycleHook.onBeforeUnmount(() => {
      Object.keys(this.runtimeBinding).forEach(key => {
        this.runtimeBinding[key]();
      });
    })
  }


  initEvents() {
    this.events = createTenonEvents(this.material);
  }

  initProps(schemas, source) {
    this.props = createPropsBySchemas(
      schemas,
      Object.assign({}, this.material?.config?.tenonProps, source || {})
    );
  }

  initSlots() {
    this.slots = {};
  }

  clone() {
    const instance = new TenonComponent(this.material, {
      parent: this.parent,
      props: cloneDeep(toRaw(this.props)),
    });
    instance.schemas = cloneDeep(this.schemas);
    instance.material = cloneDeep(this.material);
    instance.events = cloneDeep(this.events);
    // instance.slots = cloneDeep(this.slots);
    Object.keys(this.slots).forEach(slotKey => {
      instance.slots[slotKey] = this.slots[slotKey].clone();
    });
    if (this.children) {
      instance.children = this.children.map(child => {
        const childInstance = child.clone();
        childInstance.parent = instance;
        return childInstance;
      });
    };
    return instance;
  }

  serialize(): ComponentSerializeConfig {
    const newConfig: ComponentSerializeConfig = {} as ComponentSerializeConfig;
    newConfig.id = this.id;
    newConfig.name = this.name;
    if (this.props) {
      newConfig.props = cloneDeep(toRaw(this.props));
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

