import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { Ref } from "vue";

export interface IPwaFeature {
  // interface
  offlineReady?: Ref<boolean>;
  needRefresh?: Ref<boolean>;
  initPWA: () => void;
}

export const IPwaFeature = createDynamicFeatureTag(FeatureName.Pwa);

// bind feature tag here
bindDynamicLoader(IPwaFeature, {
  load: async () => {
    const {
      PwaHandler,
    } = await import('./pwa.handler');
    return PwaHandler;
  },
})
