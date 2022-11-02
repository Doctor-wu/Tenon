import { createSyncFeatureTag } from "@tenon/workbench";


export interface FeatureAFeature {
  // interface
  invokeA: () => void;
};

export const FeatureAFeature = createSyncFeatureTag('FeatureA');
