import { BaseNotification } from "@/core/notification";
import { ModeType } from "./edit-mode.interface";

export class ModeNotification extends BaseNotification<ModeType> {
  constructor(
    public type: ModeType,
  ) {
    super(type);
  }
}
