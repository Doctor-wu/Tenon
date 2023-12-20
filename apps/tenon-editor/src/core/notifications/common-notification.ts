import { BaseNotification } from "./base-notification";

export enum CommonNotificationType {
  /** window 发生 resize */
  WINDOW_RESIZE = "window-resize",
  /**
   * navigation 离开当前页面
   */
  WINDOW_DISPOSE = "window-dispose",
}

export class WindowResizeNotification extends BaseNotification {
  constructor() {
    super(CommonNotificationType.WINDOW_RESIZE);
  }
}

export class WindowDisposeNotification extends BaseNotification {
  constructor() {
    super(CommonNotificationType.WINDOW_DISPOSE);
  }
}
