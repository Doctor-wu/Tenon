import { createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IEditModeFeature {
  // interface
}

export const IEditModeFeature = createSyncFeatureTag(FeatureName.EditMode);

// bind feature tag here

