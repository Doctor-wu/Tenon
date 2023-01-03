import { bindDynamicLoader, bindSyncFeature, createDynamicFeatureTag, createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IFullScreenFeature {
  // interface
  toggleFullScreen: () => Promise<boolean>;
  isFullScreen: boolean;
  enableFullScreen: () => boolean;
}

export enum FullScreenType {
  FullScreen = 'full-screen',
  UnFullScreen = 'un-full-screen',
};

export const IFullScreenFeature = createDynamicFeatureTag(FeatureName.FullScreen);

bindDynamicLoader(IFullScreenFeature, {
  load: async () => {
    const {
      FullScreenHandler,
    } = await import('./fullscreen.handler');
    return FullScreenHandler;
  }
})
