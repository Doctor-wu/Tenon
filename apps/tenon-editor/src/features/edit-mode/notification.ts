import { ToolBarName } from "@/configs/tool-bar-config";
import { BaseNotification } from "@/core/notifications/base-notification";
import { EditModeType } from "./edit-mode.interface";

/** 编辑模式改变 */
export const EditModeChange = 'edit-mode-change';

export class ModeNotification extends BaseNotification<typeof EditModeChange> {
  constructor(
    public mode: EditModeType,
    public preMode: EditModeType,
  ) {
    super(EditModeChange);
  }
}
