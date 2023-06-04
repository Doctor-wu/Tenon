import {
  Feature
} from "@tenon/workbench";
import { DragType, IDragPayload, IMaterialDragFeature } from "./material-drag.interface";

@Feature({
  name: IMaterialDragFeature,
})
export class MaterialDragHandler implements IMaterialDragFeature {
  private payload: IDragPayload[DragType] | null = null;
  constructor() { }

  draggableElement<T extends DragType>(
    el: HTMLElement,
    dragType: T,
    getPayload: () => IDragPayload[T],
  ): () => void {
    const abort = new AbortController();
    el.draggable = true;
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer!.effectAllowed = 'move';
      e.dataTransfer!.dropEffect = 'move';
      e.dataTransfer!.setData('dragType', dragType);
      if (dragType === DragType.Component) {
        e.dataTransfer!.setDragImage(el, 0, 0);
      } else if (dragType === DragType.Material) {
        const previewDom = el.querySelector('.material-list-item__preview') as HTMLElement;
        if (previewDom) {
          e.dataTransfer!.setDragImage(previewDom, 0, 0);
        } else {
          e.dataTransfer!.setDragImage(el, 0, 0);
        }
      }
      this.payload = getPayload();
    }, {
      signal: abort.signal,
    });
    return () => {
      abort.abort();
    }
  }

  getDragPayload<T extends DragType>(e: DragEvent, type: T): IDragPayload[T] {
    const dragType = e.dataTransfer!.getData('dragType');
    if (dragType !== type) {
      return null as any;
    }
    return this.payload! as IDragPayload[T];
  }
}
