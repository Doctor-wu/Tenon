import {
  Feature, IDynamicFeature, Inject, Loader, awaitLoad
} from "@tenon/workbench";
import { DragType, IDragPayload, IMaterialDragFeature } from "./material-drag.interface";
import { IContext, TenonEditorContext } from "@/core";
import { DragNotification, DragStatusChange } from "./notification";
import { effect, ref } from "vue";
import { ModeType } from "../edit-mode/notification";
import { IEditModeFeature } from "../edit-mode";
import { Logger } from "@/utils/logger";

@Feature({
  name: IMaterialDragFeature,
})
export class MaterialDragHandler implements IMaterialDragFeature {
  public computedDragging = ref(false);
  private dragging = ref(false);
  private payload: IDragPayload[DragType] | null = null;

  @Loader(IEditModeFeature)
  private editModeFeature!: IDynamicFeature<IEditModeFeature>;

  private get editMode() {
    return this.editModeFeature.instance!;
  }

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    this.initEvent();
  }

  draggableElement<T extends DragType>(
    el: HTMLElement,
    dragType: T,
    getPayload: () => IDragPayload[T],
  ): () => void {
    const abort = new AbortController();
    el.draggable = true;
    el.addEventListener('dragstart', (e) => {
      if (this.editMode.mode.value !== ModeType.Edit) return e.preventDefault();
      e.stopPropagation();
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
      this.context.fire(
        new DragNotification(true),
      );
    }, {
      signal: abort.signal,
    });
    el.addEventListener('dragend', (e) => {
      e.stopPropagation();
      this.context.fire(
        new DragNotification(false),
      );
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

  @awaitLoad(IEditModeFeature)
  private initEvent() {
    this.context.on(DragStatusChange, (notification: DragNotification) => {
      this.dragging.value = notification.dragging;
      Logger.log('DragStatusChange', notification.dragging);
    });
    effect(() => {
      const value = this.dragging.value
        && this.editMode.mode.value === ModeType.Edit;
      this.computedDragging.value = value;
    });
  }
}
