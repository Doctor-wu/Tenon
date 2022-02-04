import { reactive, toRaw } from "vue";
import { getTreeModel } from "../local-db";
import { config2tree, tree2config } from "./config-transform";
const treeModel = getTreeModel();
import { useStore } from "../store";
import {
  createPropsBySchemas,
  IMaterialConfig,
  ComponentTreeNode,
  DEFAULT_EVENTS,
  IEventsConfig,
} from "@tenon/engine";
import { getID, setID } from "./viewer-id";
import _ from "lodash";

export const insertChild = (parent, child, relative, insertFromFront = false) => {
  if (!relative) {
    return insertFromFront ? parent.children.unshift(child) : parent.children.push(child);
  } else {
    const index = parent.children.indexOf(relative);
    if (index === -1) {
      return insertFromFront ? parent.children.unshift(child) : parent.children.push(child);
    }
    if (index === 0 && insertFromFront) {
      return parent.children.unshift(child);
    } else {
      return parent.children.splice(insertFromFront ? index : index + 1, 0, child);
    }
  }
}

export const extractChild = (parent, child) => {
  const index = parent.children.indexOf(child);
  if (index === -1) {
    return;
  }
  parent.children.splice(index, 1);
}

export const isAncestor = (parent, child) => {
  if (!child) return false;
  if (parent === child) {
    return true;
  }
  if (child.parent === undefined) {
    return false;
  }
  return isAncestor(parent, child.parent);
}

export function insertNewComponent(beInsert, parent, relative, insertFromFront = false, options: any = {}) {
  const expressedComponent = createTenonEditorComponentByMaterial(beInsert, parent, options);

  if (options.isSlot) {
    parent[relative] = expressedComponent;
    return expressedComponent;
  }
  insertChild(parent, expressedComponent, relative, insertFromFront);
  return expressedComponent;
}

export const recursiveInsertNewComponent = (comp, parent, relative, insertFromFront = false, isSlot = false) => {
  const store = useStore();
  const beInsert = store.getters['materials/getMaterialsMap'].get(comp.name)();
  // beInsert
  const expressedComponent = insertNewComponent(beInsert, parent, relative, insertFromFront, {
    props: comp.props,
    slots: comp.slots,
    isSlot: isSlot,
    schemas: _.cloneDeep(comp.schemas),
  });
  if (comp.children) {
    comp.children.forEach((child) => {
      recursiveInsertNewComponent(child, expressedComponent, relative, insertFromFront);
    });
  }
  if (comp.slots) {
    Object.keys(comp.slots).forEach(slotKey => {
      recursiveInsertNewComponent(comp.slots[slotKey], expressedComponent.slots, slotKey, false, true)
    });
  }
  return expressedComponent;
}

export const copyComponentTreeNode = (comp: ComponentTreeNode, options: any = {}): ComponentTreeNode => {
  const store = useStore();
  const beInsert = store.getters['materials/getMaterialsMap'].get(comp.name)();
  const expressedComponent = createTenonEditorComponentByMaterial(beInsert, options.parent, {
    props: comp.props,
    slots: comp.slots,
    isSlot: options.isSlot,
    schemas: comp.schemas,
  });
  // debugger;
  if (comp.children) {
    comp.children.forEach((child) => {
      expressedComponent.children?.push(copyComponentTreeNode(child, { parent: expressedComponent }));
    });
  }
  if (comp.slots) {
    Object.keys(comp.slots).forEach(slotKey => {
      expressedComponent.slots[slotKey] = (copyComponentTreeNode(comp.slots[slotKey], { isSlot: true }));
    });
  }
  return expressedComponent;
}


export const createTenonEditorComponentByMaterial = (material: IMaterialConfig, sup: ComponentTreeNode | null = null, options: any = {}): ComponentTreeNode => {
  const {
    props,
    slots,
    isSlot,
    schemas,
  } = options;
  const id = getID();

  const expressedComponent: any = reactive<ComponentTreeNode>({
    name: material.name,
    parent: isSlot ? null : sup,
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

function createTenonEvents(material: IMaterialConfig): IEventsConfig {
  const events: IEventsConfig = _.cloneDeep(DEFAULT_EVENTS);
  if (material.config.events) {
    Object.keys(material.config.events).forEach(eventKey => {
      events[eventKey] = {
        eventLabel: material.config.events[eventKey],
        executeQueue: []
      };
    });
  }
  return events;
}

export const uploadTree = (tree: ComponentTreeNode) => {
  const store = useStore();
  const config = toRaw<ComponentTreeNode>(tree2config(tree));

  return treeModel.set({
    config,
    lastID: getID(),
  });
}

export const downloadTree = async (): Promise<ComponentTreeNode> => {
  const store = useStore();
  const tree = await treeModel.get() as any;
  if (!tree) return tree;
  const {
    lastID,
    config,
  } = tree;
  // store.dispatch('viewer/setCompId', lastID);
  setID(lastID);
  config2tree(config);
  store.dispatch('viewer/setTree', config);
  store.dispatch('viewer/setActiveComponent', null);
  return config;
}
