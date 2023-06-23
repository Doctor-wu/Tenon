import { ToolBarName } from "@/configs/tool-bar-config";
import { BaseNotification } from "@/core/notification";

export enum ModeType {
  Preview = ToolBarName.PreviewMode,
  Edit = ToolBarName.EditMode,
};

/** 编辑模式改变 */
export const EditModeChange = 'edit-mode-change';

export class ModeNotification extends BaseNotification<typeof EditModeChange> {
  constructor(
    public mode: ModeType,
    public preMode: ModeType,
  ) {
    super(EditModeChange);
  }
}
