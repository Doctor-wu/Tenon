import { useStore } from "../store";

export const handleMaterialDragStart = (ev: DragEvent, ctx) => {
  // event.preventDefault();
  ev.dataTransfer!.effectAllowed = 'move';
  ev.dataTransfer!.dropEffect = 'move';
  ev.dataTransfer?.setDragImage(ev.target as HTMLElement, 0, 0);
  const store = useStore();
  // console.log(ev, ctx);
  store.dispatch('viewer/setDraggingComponent', ctx.comp);
}

export const handleMaterialDragEnd = (ev: DragEvent, ctx) => {
  const store = useStore();
  store.dispatch('viewer/setDraggingComponent', null);
  store.dispatch('viewer/setHoveringComponent', null);
}

export const handleContainerDropEnter = (ev: DragEvent, ctx) => {
  ev.preventDefault();
  const store = useStore();
  // if (!store.getters['viewer/getDraggingComponent']) return;
  ev.stopPropagation();
  // const store = useStore();
  store.dispatch('viewer/setHoveringComponent', ctx.config);
}

export const handleContainerDrop = async (ev: DragEvent, ctx) => {
  ev.preventDefault();
  ev.stopPropagation();
  const store = useStore();
  const draggingComponent = store.getters['viewer/getDraggingComponent']();

  const expressedComponent: any = {
    name: draggingComponent.name,
    parent: ctx.config,
    id: await store.dispatch('viewer/setCompId'),
  };
  if (draggingComponent.children) {
    expressedComponent.children = [];
  }
  ctx.config.children.push(expressedComponent);
  console.log(store.getters['viewer/getTree']);

}