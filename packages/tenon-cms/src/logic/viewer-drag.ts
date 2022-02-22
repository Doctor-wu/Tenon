import { useStore } from "../store";
import { extractChild, insertChild, insertNewComponent, isAncestor } from "./tree-operation";
import { nextTick, ref } from 'vue';
import { Notification } from "@arco-design/web-vue";
import { findParentTenonComp } from "@tenon/materials";



export const dragging = ref(false);
export const hovering = ref(-1);
export const draggingMaterial = ref(false);

export const handleMaterialDragStart = (ev: DragEvent, configOrFactory, isAMaterial = true) => {
  dragging.value = true;
  draggingMaterial.value = isAMaterial;
  ev.dataTransfer!.effectAllowed = 'move';
  ev.dataTransfer!.dropEffect = 'move';
  ev.dataTransfer?.setDragImage(ev.target as HTMLElement, 0, 0);
  const store = useStore();
  if (isMaterial(configOrFactory) && configOrFactory instanceof Function) {
    const material = configOrFactory();

    store.dispatch('viewer/setDraggingComponent', material);
  } else {
    store.dispatch('viewer/setDraggingComponent', configOrFactory);
  }
}

export const handleMaterialDragEnd = (ev: DragEvent, config) => {
  const store = useStore();
  store?.dispatch('viewer/setDraggingComponent', null);
  store?.dispatch('viewer/setHoveringComponent', null);
  dragging.value = false;
  hovering.value = -1;
}

export const handleContainerDropEnter = (ev: DragEvent, config) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  store.dispatch('viewer/setHoveringComponent', config);
}

export const handleWrapperDrop = (ev: DragEvent, config) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  const draggingComponent = store.getters['viewer/getDraggingComponent'];
  if (isMaterial(draggingComponent)) {
    return insertNewComponent(draggingComponent, config.parent, config);
  }

  extractChild(draggingComponent.parent, draggingComponent);

  insertChild(config.parent, draggingComponent, config);

  draggingComponent.parent = config.parent;
  nextTick(() => {
    draggingComponent.parentComponent = findParentTenonComp(draggingComponent.ctx.$);
  });
}

export const handleContainerDrop = async (ev: DragEvent, config, relative?: any) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  let draggingComponent: any = store.getters['viewer/getDraggingComponent'];

  if (draggingComponent === config || isAncestor(draggingComponent, config)) {
    Notification.warning({
      title: '拖拽错误',
      content: '不能将容器拖拽到自己或自己的子容器中',
    });
    return;
  };
  if (isMaterial(draggingComponent)) {
    // 物料拖拽
    insertNewComponent(draggingComponent, config, relative);
  } else {
    extractChild(draggingComponent.parent, draggingComponent);
    insertChild(config, draggingComponent, relative);
    draggingComponent.parent = config;
    nextTick(() => {
      draggingComponent.parentComponent = findParentTenonComp(draggingComponent.ctx.$);
    });
  };
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

export const isMaterial = (config):boolean => {
  return !config.parent && !config.isSlot;
}