import {
  bindDynamicLoader, createDynamicFeatureTag
} from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IMaterialFeature {
  // interface
  isPanelOpen: boolean;
  switchPanel(open: boolean): void;
  draggableMaterial: (el: HTMLElement, payload: () => string) => Promise<() => void>;
  // getWetMaterial(dryMaterial: IDryMaterial): IWetMaterial | undefined;
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

