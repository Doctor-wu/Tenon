import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { ModeType } from "./notification";
import { Ref } from "vue";

export interface IEditModeFeature {
  // interface
  mode: Ref<ModeType>;
  switchMode(mode: ModeType): void;
}

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

