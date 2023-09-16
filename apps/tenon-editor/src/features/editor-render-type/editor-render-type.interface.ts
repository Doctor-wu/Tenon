import { createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export enum EditorRenderType {
  React = 'React',
  Vue = 'Vue',
}

export interface IEditorRenderTypeFeature {
  // interface
}

export const IEditorRenderTypeFeature = createSyncFeatureTag(FeatureName.EditorRenderType);

// bind feature tag here

