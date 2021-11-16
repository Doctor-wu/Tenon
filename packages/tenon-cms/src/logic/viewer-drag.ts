import { useStore } from "../store";
import { createComponentByMaterial, extractChild, insertChild, insertNewComponent, isAncestor } from "./tree-operation";
import { ref } from 'vue';
import { Notification } from "@arco-design/web-vue";
export const dragging = ref(false);
export const hovering = ref(-1);
export const draggingMaterial = ref(false);

export const handleMaterialDragStart = (ev: DragEvent, ctx, isMaterial = true) => {
  dragging.value = true;
  draggingMaterial.value = isMaterial;
  ev.dataTransfer!.effectAllowed = 'move';
  ev.dataTransfer!.dropEffect = 'move';
  ev.dataTransfer?.setDragImage(ev.target as HTMLElement, 0, 0);
  const store = useStore();

  if (!ctx.config.parent) {
    const material = ctx.config();
    // const comp = createComponentByMaterial(material);
    // console.log(material, comp);

    store.dispatch('viewer/setDraggingComponent', material);
  } else {
    store.dispatch('viewer/setDraggingComponent', ctx.config);
  }
}

export const handleMaterialDragEnd = (ev: DragEvent, ctx) => {
  const store = useStore();
  store?.dispatch('viewer/setDraggingComponent', null);
  store?.dispatch('viewer/setHoveringComponent', null);
  dragging.value = false;
  hovering.value = -1;
}

export const handleContainerDropEnter = (ev: DragEvent, ctx) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  store.dispatch('viewer/setHoveringComponent', ctx.config);
}

export const handleWrapperDrop = (ev: DragEvent, ctx) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  const draggingComponent = store.getters['viewer/getDraggingComponent'];
  if (!draggingComponent.parent) {

    return insertNewComponent(draggingComponent, ctx.config.parent, ctx.config);
  }

  extractChild(draggingComponent.parent, draggingComponent);

  insertChild(ctx.config.parent, draggingComponent, ctx.config);

  draggingComponent.parent = ctx.config.parent;
}

export const handleContainerDrop = async (ev: DragEvent, ctx, relative?: any) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  let draggingComponent: any = store.getters['viewer/getDraggingComponent'];
  if (isAncestor(draggingComponent, ctx.config) || draggingComponent === ctx.config) {
    Notification.warning({
      title: '拖拽错误',
      content: '不能将容器拖拽到自己或自己的子容器中',
    });
    return;
  }
  if (!draggingComponent.parent) {
    // 物料拖拽
    await insertNewComponent(draggingComponent, ctx.config, relative);
  } else {
    extractChild(draggingComponent.parent, draggingComponent);
    insertChild(ctx.config, draggingComponent, relative);
    draggingComponent.parent = ctx.config;
  }
}

export const deleteDraggingComponent = (ev: DragEvent) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  let draggingComponent: any = store.getters['viewer/getDraggingComponent'];
  if (draggingComponent.parent) {
    extractChild(draggingComponent.parent, draggingComponent);
  }
}