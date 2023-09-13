import { createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface ITitleFeature {
  // interface
  getTitle: () => Promise<{
    title: string;
    subTitle: string;
  }>
}

export const ITitleFeature = createSyncFeatureTag(FeatureName.Title);

