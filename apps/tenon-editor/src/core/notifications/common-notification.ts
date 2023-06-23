import { BaseNotification } from "../notification";

export enum CommonNotificationType {
  /** window 发生 resize */
  WINDOW_RESIZE = "window-resize",
}

export class WindowResizeNotification extends BaseNotification {
  constructor() {
    super(CommonNotificationType.WINDOW_RESIZE);
  }
}
