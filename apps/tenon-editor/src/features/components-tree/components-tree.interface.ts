import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IComponentsTreeFeature {
  // interface
}

export const IComponentsTreeFeature = createDynamicFeatureTag(FeatureName.ComponentsTree);

// bind feature tag here
bindDynamicLoader(IComponentsTreeFeature, {
  load: async () => {
    const {
      ComponentsTreeHandler,
    } = await import("./components-tree.handler");
    return ComponentsTreeHandler;
  }
})

