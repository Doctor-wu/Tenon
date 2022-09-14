import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";


export interface FeatureCFeature {
  // interface
  invokeC: () => void;
};

export const FeatureCFeature = createDynamicFeatureTag('FeatureC');

bindDynamicLoader(FeatureCFeature, {
  // 当 feature c真正被使用到的时候才会被加载
  load: async () => {
    return (await import('./feature-c.handler')).FeatureCHandler;
  },
})
