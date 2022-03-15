import { reactive, toRaw } from "vue";
import { createPropsBySchemas } from "../schema";
import { getID } from "./id";
import { ComponentSerializeConfig, ComponentTreeNode } from "./component.interface";
import { IMaterial } from "@tenon/materials";
import { cloneDeep } from "lodash";
import { ITenonComponentStates, TenonComponentStates } from "../states";

export class TenonComponent implements ComponentTreeNode {
  public name!: string;
  public id: number;
  public schemas: any;
  public parent?: ComponentTreeNode;
  public parentComponent?: ComponentTreeNode;
  public material: IMaterial;
  // public states?: ITenonComponentStates;
  public props?: any;
  public children?: TenonComponent[];
  public slots!: Record<string, TenonComponent>;
  public ctx?: any;
  public isSlot?: boolean;

  static createInstanceByDeserialize(
    config: ComponentSerializeConfig, materialsMap: Map<string, () => IMaterial>
  ): TenonComponent | null {
    const compFactory = materialsMap.get(config.name);
    if (!compFactory) return null;
    const material = compFactory();
    const instance = new TenonComponent(material);
    // debugger;
    // instance.states = new TenonComponentStates(config.states, instance);
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
    Object.assign(instance, config, {
      slots: instance.slots,
      children: instance.children,
    });
    return instance;
  }

  constructor(material: IMaterial, options: {
    parent?: ComponentTreeNode;
    props?: any;
  } = {}) {
    this.id = getID();
    this.parent = options.parent;
    this.name = material.name;
    this.material = material;
    this.schemas = material.schemas;
    this.initProps(material.schemas, options.props);
    this.initSlots();
    if (material.config.nestable) this.children = [];
    return reactive(this);
  }

  initProps(schemas, source) {
    this.props = createPropsBySchemas(
      schemas,
      Object.assign({}, this.material?.config.tenonProps, source || {})
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
    // instance.slots = cloneDeep(this.slots);
    Object.keys(this.slots).forEach(slotKey => {
      instance.slots[slotKey] = this.slots[slotKey].clone();
    });
    if (this.children) {
      instance.children = this.children.map(child => child.clone());
    };
    return instance;
  }

  serialize(): ComponentSerializeConfig {
    const newConfig: ComponentSerializeConfig = {} as ComponentSerializeConfig;
    newConfig.id = this.id;
    newConfig.name = this.name;
    // newConfig.states = toRaw(cloneDeep(this.states));
    if (this.props) {
      newConfig.props = cloneDeep(this.props);
    }
    if (this.schemas) {
      newConfig.schemas = toRaw(this.schemas);
    }
    if (this.children) {
      newConfig.children = this.children.map(child => {
        return child.serialize();
      });
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

