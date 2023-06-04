import {
  bindDynamicLoader, createDynamicFeatureTag
} from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { BaseMaterial } from "@tenon/materials";

export interface IMaterialFeature {
  // interface
  isPanelOpen: boolean;
  switchPanel(open: boolean): void;
  draggableMaterial(el: HTMLElement, getPayload: () => BaseMaterial): Promise<() => void>;
}

export const IMaterialFeature = createDynamicFeatureTag(FeatureName.Material);

// bind feature tag here
bindDynamicLoader(IMaterialFeature, {
  load: async () => {
    const {
      MaterialHandler,
    } = await import('./material.handler');
    return MaterialHandler;
  }
})

