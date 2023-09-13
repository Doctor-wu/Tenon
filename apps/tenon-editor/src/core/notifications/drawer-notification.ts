import { DrawerDisplayType } from "@tenon/workbench/typings";
import { BaseNotification } from "./base-notification";

export enum LeftDrawerNotificationType {
  /** 左侧抽屉点击关闭按钮 */
  ClOSE_FROM_INTERNAL = "close-from-internal-left",
  /** 左侧抽屉收起 */
  CLOSE_LEFT_DRAWER = "close-left-drawer",
  /** 左侧抽屉展开 */
  OPEN_LEFT_DRAWER = "open-left-drawer",
  /** 左侧抽屉布局模式改变 */
  DRAWER_DISPLAY_TYPE_CHANGE = "drawer-display-type-change-left",
}

export enum RightDrawerNotificationType {
  /** 右侧抽屉点击关闭按钮 */
  ClOSE_FROM_INTERNAL = "close-from-internal-right",
  /** 右侧抽屉收起 */
  CLOSE_RIGHT_DRAWER = "close-right-drawer",
  /** 右侧抽屉展开 */
  OPEN_RIGHT_DRAWER = "open-right-drawer",
  /** 右侧抽屉布局模式改变 */
  DRAWER_DISPLAY_TYPE_CHANGE = "drawer-display-type-change-right",
}

export class DrawerNotification<
  Align extends "left" | "right" = "left",
  Type extends Align extends "left"
  ? LeftDrawerNotificationType
  : RightDrawerNotificationType = Align extends "left"
  ? LeftDrawerNotificationType
  : RightDrawerNotificationType
> extends BaseNotification {
  public alignment: Align;
  public type: Type;
  constructor(type: Type, alignment: Align) {
    super(type);
    this.alignment = alignment;
  }
}

export class DrawerDisplayTypeNotification extends BaseNotification {
  public alignment: "left" | "right";
  public type: DrawerDisplayType;
  constructor(type: DrawerDisplayType, alignment: "left" | "right") {
    super(
      alignment === "left"
        ? LeftDrawerNotificationType.DRAWER_DISPLAY_TYPE_CHANGE
        : RightDrawerNotificationType.DRAWER_DISPLAY_TYPE_CHANGE
    );
    this.alignment = alignment;
    this.type = type;
  }
}
