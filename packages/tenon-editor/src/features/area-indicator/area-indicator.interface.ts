import { createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { ISurfaceOperateFeature } from "../surface-operate";

export interface IAreaIndicatorFeature {
  // interface
  markElement: (element: HTMLElement, type: AreaMarkType) => void;
  useHoverMark: (element: HTMLElement) => Promise<AbortController>;
  getElementRectRelativeWithSurface: (element: HTMLElement) => Promise<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>;
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
