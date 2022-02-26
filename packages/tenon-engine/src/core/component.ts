import { createTenonEvents, IEventsConfig } from "./events";
import { reactive } from "vue";
import { createPropsBySchemas } from "./schema";

export interface ComponentTreeNode {
  name: string; // 组件名称
  id: number; // 组件id
  schemas: any; // 组件schemas
  parent: ComponentTreeNode | null; // 组件父级
  refs: any; // 引用
  events: IEventsConfig; // 组件事件
  handlers: string[];
  refKey?: string;
  ctx?: any;
  textID?: string;
  parentComponent?: ComponentTreeNode;
  props?: any;
  states?: any;
  children?: ComponentTreeNode[];
  material?: any;
  slots: Object;
  isSlot?: boolean;
}


export const createTenonComponent =
  (material: any, sup: ComponentTreeNode | null = null, options: any = {}): ComponentTreeNode => {
    const {
      props,
      slots,
      isSlot,
      schemas,
    } = options;
    const id = getID();

    const expressedComponent: any = reactive<ComponentTreeNode>({
      name: material.name,
      parent: sup,
      material,
      props: createPropsBySchemas(
        schemas || material.schemas!
        , isSlot
          ? material.config.tenonProps || null
          : (props || material.config.tenonProps)
      ),
      id,
      refs: {},
      events: createTenonEvents(material),
      handlers: [],
      schemas: schemas || material.schemas!,
      textID: String(id),
      slots: {},
      isSlot: !!isSlot,
    });

    if (material.config.nestable) {
      expressedComponent.children = material.children || [];
    }

    material.tenonComp = expressedComponent;
    return expressedComponent;
  }


let id = 1;

export const getID = () => {
  let currId = id;
  id++;
  return currId;
}

export const setID = (newID: number) => {
  id = newID;
}
