import { reactive } from "vue";
import { useStore } from "../store";

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
  if (parent === child) {
    return true;
  }
  if (child.parent === undefined) {
    return false;
  }
  return isAncestor(parent, child.parent);
}



export async function insertNewComponent(beInsert, sup, relative, insertFromFront = false) {
  const expressedComponent = await createComponentByMaterial(beInsert, sup);

  insertChild(sup, expressedComponent, relative, insertFromFront);
  return expressedComponent;
}

export const recursiveInsertNewComponent = async (comp, parent, relative, insertFromFront = false) => {
  const store = useStore();
  const beInsert = store.getters['materials/getMaterialsMap'].get(comp.name)();
  const expressedComponent = await insertNewComponent(beInsert, parent, relative, insertFromFront);
  if (comp.children) {
    comp.children.forEach(async (child) => {
      await recursiveInsertNewComponent(child, expressedComponent, relative, insertFromFront);
    });
  }
  return expressedComponent;
}

export const createComponentByMaterial = async (material, sup) => {
  const store = useStore();
  const id = await store.dispatch('viewer/setCompId');
  const expressedComponent: any = reactive({
    name: material.name,
    parent: sup,
    material,
    id,
    textID: String(id),
  });

  if (material.config.nestable) {
    expressedComponent.children = [];
  }
  return expressedComponent;
}