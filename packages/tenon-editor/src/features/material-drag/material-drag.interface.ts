import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import type { RuntimeComponentTree } from "@/core/model/runtime-component-tree";
import type { BaseMaterial } from "@tenon/materials";

export enum DragType {
  /** 拖拽组件 */
  Component = 'Component',
  /** 拖拽物料 */
  Material = 'Material',
}

export interface IDragPayload {
  [DragType.Component]: RuntimeComponentTree;
  [DragType.Material]: BaseMaterial;
}

export interface IMaterialDragFeature {
  // interface
  draggableElement<T extends DragType>(el: HTMLElement, dragType: T, getPayload: () => IDragPayload[T]): () => void;
  getDragPayload<T extends DragType>(e: DragEvent, type: T): IDragPayload[T];
}

export const IMaterialDragFeature = createDynamicFeatureTag(FeatureName.MaterialDrag);

// bind feature tag here
bindDynamicLoader(IMaterialDragFeature, {
  load: async () => {
    const {
      MaterialDragHandler,
    } = await import('./material-drag.handler');
    return MaterialDragHandler;
  }
});
