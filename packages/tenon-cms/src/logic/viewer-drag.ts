import { useStore } from "../store";
import { extractChild, insertChild, insertNewComponent, isAncestor } from "./tree-operation";
import { nextTick, ref } from 'vue';
import { Notification } from "@arco-design/web-vue";
import { findParentTenonComp } from "@tenon/materials";
import { releaseID, TenonComponent } from "@tenon/engine";



export const dragging = ref(false);
export const hovering = ref(-1);
export const draggingMaterial = ref(false);

export const handleMaterialDragStart = (ev: DragEvent, componentOrFactory, isAMaterial = true) => {
  dragging.value = true;
  draggingMaterial.value = isAMaterial;
  ev.dataTransfer!.effectAllowed = 'move';
  ev.dataTransfer!.dropEffect = 'move';
  ev.dataTransfer?.setDragImage(ev.target as HTMLElement, 0, 0);
  const store = useStore();
  if (isMaterial(componentOrFactory) && componentOrFactory instanceof Function) {
    const material = componentOrFactory();

    store.dispatch('viewer/setDraggingComponent', material);
  } else {
    store.dispatch('viewer/setDraggingComponent', componentOrFactory);
  }
}

export const handleMaterialDragEnd = (ev: DragEvent, config) => {
  const store = useStore();
  store?.dispatch('viewer/setDraggingComponent', null);
  store?.dispatch('viewer/setHoveringComponent', null);
  dragging.value = false;
  hovering.value = -1;
}

export const handleContainerDropEnter = (ev: DragEvent, component: TenonComponent) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  store.dispatch('viewer/setHoveringComponent', component);
}

export const handleWrapperDrop = (ev: DragEvent, component: TenonComponent) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  const draggingComponent = store.getters['viewer/getDraggingComponent'];
  if (isMaterial(draggingComponent)) {
    return insertNewComponent(draggingComponent, component.parent, component);
  }

  extractChild(draggingComponent.parent, draggingComponent);

  insertChild(component.parent, draggingComponent, component);

  draggingComponent.parent = component.parent;
  nextTick(() => {
    draggingComponent.parentComponent = findParentTenonComp(draggingComponent.ctx.$);
  });
}

export const handleContainerDrop = async (ev: DragEvent, component: TenonComponent, relative?: any) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  let draggingComponent: any = store.getters['viewer/getDraggingComponent'];

  if (draggingComponent === component || isAncestor(draggingComponent, component)) {
    Notification.warning({
      title: '拖拽错误',
      content: '不能将容器拖拽到自己或自己的子容器中',
    });
    return;
  };
  if (isMaterial(draggingComponent)) {
    // 物料拖拽
    insertNewComponent(draggingComponent, component, relative);
  } else {
    extractChild(draggingComponent.parent, draggingComponent);
    insertChild(component, draggingComponent, relative);
    draggingComponent.parent = component;
    nextTick(() => {
      draggingComponent.parentComponent = findParentTenonComp(draggingComponent.ctx.$);
    });
  };
}

export const deleteDraggingComponent = (ev: DragEvent) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  let draggingComponent: TenonComponent = store.getters['viewer/getDraggingComponent'];
  if (draggingComponent.parent) {
    extractChild(draggingComponent.parent, draggingComponent);
    if (store.getters['viewer/getActiveComponent'] === draggingComponent) {
      store.dispatch('viewer/setActiveComponent', null);
    };
    draggingComponent.destroy();
  }
}

export const isMaterial = (component: TenonComponent): boolean => {
  return !component.parent && !component.isSlot;
}