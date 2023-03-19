import { BaseNotification } from "../notification";

export enum LeftDrawerNotificationType {
  ClOSE_FROM_INTERNAL = "close-from-internal-left",
}

export enum RightDrawerNotificationType {
  ClOSE_FROM_INTERNAL = "close-from-internal-right",
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
