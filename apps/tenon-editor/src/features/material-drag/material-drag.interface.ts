import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import type { RuntimeTreeNode } from "@/core/model/data-structure/runtime-tree/runtime-tree";
import type { BaseMaterial } from "@tenon/materials";
import { Ref } from "vue";
import { IRenderer } from "@/core/renderer";

export enum DragType {
  /** 拖拽组件 */
  Component = 'Component',
  /** 拖拽物料 */
  Material = 'Material',
}

export interface IDragPayload {
  [DragType.Component]: RuntimeTreeNode;
  [DragType.Material]: string;
}

export interface IMaterialDragFeature {
  // interface
  computedDragging: Ref<boolean>;
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
