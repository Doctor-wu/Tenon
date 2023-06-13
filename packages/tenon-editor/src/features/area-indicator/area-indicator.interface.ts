import { createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IAreaIndicatorFeature {
  // interface
  markElement: (element: HTMLElement, type: AreaMarkType) => void;
  useHoverMark: (element: HTMLElement) => Promise<AbortController>;
  useSingletonMark: (type: SingleMarkType, element: HTMLElement) => Promise<() => void>;
  useSingletonHoverMark: (type: SingleMarkType.DragHover | SingleMarkType.DropHovering, element: HTMLElement) => Promise<() => void>;
  getElementRectRelativeWithSurface: (element: HTMLElement) => Promise<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>;
  changeVisible: (visible: boolean) => void;
  update: () => void;
}

export enum AreaMarkType {
  Active = "Active",
  DragHover = "DragHover",
  DropHovering = "DropHovering",
}

export const AreaMarkStyleMap = {
  [AreaMarkType.Active]: "2px solid #1890ff",
  [AreaMarkType.DragHover]: "2px dashed #7940e2",
  [AreaMarkType.DropHovering]: "2px dashed #f5222d",
};

export enum SingleMarkType {
  Active = "Active",
  DragHover = "DragHover",
  DropHovering = "DropHovering",
}

export const IAreaIndicatorFeature = createSyncFeatureTag(FeatureName.AreaIndicator);

// bind feature tag here
