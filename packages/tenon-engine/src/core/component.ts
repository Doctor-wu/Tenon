import { createTenonEvents, IEventsConfig } from "./events";
import { IMaterial } from "@tenon/materials";
import { reactive } from "vue";
import { createPropsBySchemas } from "./schema";

export interface ComponentTreeNode {
  name: string;
  id: number;
  schemas: any;
  parent: ComponentTreeNode | null;
  refs: any;
  events: IEventsConfig;
  handlers: string[];
  refKey?: string;
  ctx?: any;
  textID?: string;
  parentComponent?: ComponentTreeNode;
  material?: IMaterial;
  props?: any;
  states?: any;
  children?: ComponentTreeNode[];
  slots: Object;
  isSlot?: boolean;
}


export const createTenonEditorComponentByMaterial = (material: any, sup: ComponentTreeNode | null = null, options: any = {}): ComponentTreeNode => {
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
