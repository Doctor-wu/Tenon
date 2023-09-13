import { BaseNotification } from "@/core";

export const DragStatusChange = 'MaterialOrRuntimeTreeDragStatusChange';

export class DragNotification extends BaseNotification {
  public dragging: boolean;
  constructor(dragging: boolean) {
    super(DragStatusChange);
    this.dragging = dragging;
  }
}
