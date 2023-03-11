import { createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IAreaIndicatorFeature {
  // interface
  markElement: (element: HTMLElement, type: AreaMarkType) => void;
  initHoverEvent: (element: HTMLElement) => void;
}

export enum AreaMarkType {
  Active = "active",
  Hover = "hover",
  Error = "error",
}

export const AreaMarkStyleMap = {
  [AreaMarkType.Active]: "2px solid #1890ff",
  [AreaMarkType.Hover]: "2px dashed #7940e2",
  [AreaMarkType.Error]: "2px solid #f5222d",
};

export const IAreaIndicatorFeature = createSyncFeatureTag(FeatureName.AreaIndicator);

// bind feature tag here
