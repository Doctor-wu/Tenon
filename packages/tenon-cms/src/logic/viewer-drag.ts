import { useStore } from "../store";
import { extractChild, insertChild } from "./tree-operation";
import { ref } from 'vue';
export const dragging = ref(false);
export const hovering = ref(-1);

export const handleMaterialDragStart = (ev: DragEvent, ctx, isMaterial = true) => {
  // event.preventDefault();
  dragging.value = true;
  ev.dataTransfer!.effectAllowed = 'move';
  ev.dataTransfer!.dropEffect = 'move';
  ev.dataTransfer?.setDragImage(ev.target as HTMLElement, 0, 0);
  const store = useStore();
  if (!ctx.comp.parent) {
    store.dispatch('viewer/setDraggingComponent', ctx.comp());
  } else {
    store.dispatch('viewer/setDraggingComponent', ctx.comp);
  }
}

export const handleMaterialDragEnd = (ev: DragEvent, ctx) => {
  const store = useStore();
  store.dispatch('viewer/setDraggingComponent', null);
  store.dispatch('viewer/setHoveringComponent', null);
  dragging.value = false;
  hovering.value = -1;
}

export const handleContainerDropEnter = (ev: DragEvent, ctx) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  store.dispatch('viewer/setHoveringComponent', ctx.config);
}

export const handleWrapperDrop = async (ev: DragEvent, ctx) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  const draggingComponent = store.getters['viewer/getDraggingComponent'];
  if (!draggingComponent.parent) {
    await insertNewComponent(draggingComponent, ctx.comp.parent, ctx.comp);
    return;
  }

  extractChild(draggingComponent.parent, draggingComponent);

  insertChild(ctx.comp.parent, draggingComponent, ctx.comp);
  console.log(11);
  
  draggingComponent.parent = ctx.comp.parent;
}

export const handleContainerDrop = async (ev: DragEvent, ctx, relative?: any) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  let draggingComponent: any = store.getters['viewer/getDraggingComponent'];
  if (draggingComponent === ctx.config) return;
  if (!draggingComponent.parent) {
    await insertNewComponent(draggingComponent, ctx.config, relative);
  } else {
    extractChild(draggingComponent.parent, draggingComponent);
    insertChild(ctx.config, draggingComponent, relative);
    draggingComponent.parent = ctx.config;
  }
}

async function insertNewComponent(beInsert, parent, relative) {
  const store = useStore();
  const id = await store.dispatch('viewer/setCompId');
  const expressedComponent: any = {
    name: beInsert.name,
    parent,
    id,
    textID: String(id),
  };
  if (beInsert.children) {
    expressedComponent.children = [];
  }
  insertChild(parent, expressedComponent, relative);
}