import { ref } from "vue";
import { useStore } from "../store";
import { extractChild, insertChild, insertNewComponent, recursiveInsertNewComponent } from "./tree-operation";
import { editMode } from "./viewer-status";

export let choosingWrapper = ref(-1);

export const handleSelectComponent = (e: MouseEvent, config) => {
  e.stopPropagation();
  if (!editMode) return;
  const store = useStore();
  store.dispatch("viewer/setActiveComponent", config);
}

export const handleClickOuterPanel = (e: MouseEvent, panel?: HTMLElement) => {
  if (!panel) return;
  if (!panel.contains(e.target as Node)) {
    const store = useStore();
    store.dispatch("viewer/setActiveComponent", null);
  }
}

export const deleteActiveComponent = (activeComponent) => {
  const store = useStore();
  extractChild(activeComponent.parent, activeComponent);
  store.dispatch("viewer/setActiveComponent", null);
}

export const upMoveActiveComponent = (activeComponent) => {
  const { parent } = activeComponent;
  if (!parent) return;
  const index = parent.children.indexOf(activeComponent);
  if (index === 0) return;
  const relative = parent.children[index - 1];
  extractChild(parent, activeComponent);
  insertChild(parent, activeComponent, relative, true);
}

export const downMoveActiveComponent = (activeComponent) => {
  const { parent } = activeComponent;
  if (!parent) return;
  const index = parent.children.indexOf(activeComponent);
  if (index === parent.children.length - 1) return;
  const relative = parent.children[index + 1];
  extractChild(parent, activeComponent);
  insertChild(parent, activeComponent, relative);
}

export const extractActiveComponentFromParent = (activeComponent) => {
  const { parent } = activeComponent;
  const { parent: grandParent } = parent;
  if (!parent || !grandParent) return;
  extractChild(parent, activeComponent);
  insertChild(grandParent, activeComponent, parent);
  activeComponent.parent = grandParent;
}

export const copyActiveComponent = (activeComponent, parent) => {
  if (!parent) return;
  recursiveInsertNewComponent(activeComponent, parent, activeComponent);
}