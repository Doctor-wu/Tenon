import { BaseNotification } from "@/core/notification";
import { FullScreenType } from "./fullscreen.interface";

export class FullScreenNotification extends BaseNotification<FullScreenType> {
  type: FullScreenType;
  constructor(type: FullScreenType) {
    super(type);
  }
}
