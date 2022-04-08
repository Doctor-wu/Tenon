import { reactive, toRaw } from "vue";
import { getTreeModel } from "../local-db";
import { useStore } from "../store";
import {
  config2tree,
  tree2config,
  createTenonComponent,
  getID,
  setID,
  ComponentTreeNode,
  TenonComponent,
  ComponentSerializeConfig,
} from "@tenon/engine";
import { cloneDeep } from "lodash";

const treeModel = getTreeModel();

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
  const componentInstance = createTenonComponent(beInsert, parent, options);

  if (options.isSlot) {
    parent[relative] = componentInstance;
    return componentInstance;
  }
  insertChild(parent, componentInstance, relative, insertFromFront);
  return componentInstance;
}

export const recursiveInsertNewComponent = (comp, parent, relative, insertFromFront = false, isSlot = false) => {
  const store = useStore();
  const beInsert = store.getters['materials/getMaterialsMap'].get(comp.name)();
  // beInsert
  const expressedComponent = insertNewComponent(beInsert, parent, relative, insertFromFront, {
    props: comp.props,
    slots: comp.slots,
    isSlot: isSlot,
    schemas: cloneDeep(comp.schemas),
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

export const copyComponentTreeNode = (comp: TenonComponent, options: any = {}): TenonComponent => {
  // const store = useStore();
  // const beInsert = store.getters['materials/getMaterialsMap'].get(comp.name)();
  // const expressedComponent = createTenonComponent(beInsert, options.parent, {
  //   props: comp.props,
  //   slots: comp.slots,
  //   isSlot: options.isSlot,
  //   schemas: comp.schemas,
  // });
  // if (comp.children) {
  //   comp.children.forEach((child) => {
  //     expressedComponent.children?.push(copyComponentTreeNode(child, { parent: expressedComponent }));
  //   });
  // }
  // if (comp.slots) {
  //   Object.keys(comp.slots).forEach(slotKey => {
  //     expressedComponent.slots[slotKey] = (copyComponentTreeNode(comp.slots[slotKey], { isSlot: true }));
  //   });
  // }
  return comp.clone();
}


export const uploadTree = (tree: TenonComponent) => {
  const config = toRaw<ComponentSerializeConfig>(
    tree2config(tree)
  );

  return treeModel.set({
    config,
    lastID: getID(),
  })
    .catch((e) => {
      console.error(e, tree);
    });
}

export const downloadTree = async (): Promise<TenonComponent> => {
  const store = useStore();
  const tree = await treeModel.get() as any;
  if (!tree) return tree;
  const {
    lastID,
    config,
  } = tree;
  setID(lastID);
  const materialsMap = store.getters["materials/getMaterialsMap"];
  const component = config2tree({ materialsMap })(config);
  store.dispatch('viewer/setTree', component);
  store.dispatch('viewer/setActiveComponent', null);
  return component;
}
