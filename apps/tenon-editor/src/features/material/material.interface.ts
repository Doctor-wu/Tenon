import {
  bindDynamicLoader, createDynamicFeatureTag
} from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { BaseMaterial, IDryMaterial, IWetMaterial } from "@tenon/materials";

export interface IMaterialFeature {
  // interface
  isPanelOpen: boolean;
  switchPanel(open: boolean): void;
  draggableMaterial(el: HTMLElement, getPayload: () => BaseMaterial): Promise<() => void>;
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

