import { createSyncFeatureTag } from "@tenon/workbench";


export interface FeatureBFeature {
  // interface
  invokeB: () => void;
};

export const FeatureBFeature = createSyncFeatureTag('FeatureB');