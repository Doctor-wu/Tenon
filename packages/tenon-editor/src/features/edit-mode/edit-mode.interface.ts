import { bindDynamicLoader, createDynamicFeatureTag, createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { ToolBarName } from "@/configs/tool-bar-config";

export interface IEditModeFeature {
  // interface
  mode: ModeType;
  switchMode(mode: ModeType): void;
}

export enum ModeType {
  Preview = ToolBarName.PreviewMode,
  Edit = ToolBarName.EditMode
};

export const IEditModeFeature = createDynamicFeatureTag(FeatureName.EditMode);
bindDynamicLoader(IEditModeFeature, {
  load: async () => {
    const {
      EditModeHandler,
    } = await import('./edit-mode.handler');
    return EditModeHandler;
  }
});

// bind feature tag here

