import { bindDynamicLoader, createDynamicFeatureTag, createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface ISurfaceOperateFeature {
  // interface
  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    border?: string,
  ): {
    id: string,
    dom: HTMLElement,
  };
  getDom(id: string): HTMLElement | undefined;
  setDom(dom: HTMLElement, x: number, y: number, width: number, height: number): void;
  removeDom(id: string): void;
  clearDom(): void;
  getSurfaceDom(): HTMLElement;
}

export const ISurfaceOperateFeature = createDynamicFeatureTag(FeatureName.SurfaceOperate);

// bind feature tag here

bindDynamicLoader(ISurfaceOperateFeature, {
  load: async () => {
    const {
      SurfaceOperateHandler,
    } = await import('./surface-operate.handler');
    return SurfaceOperateHandler;
  }
})
