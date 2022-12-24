import { createSyncFeatureTag } from "@tenon/workbench";


export interface HeaderBarFeature {
  // interface
  getGitHubHref(): string;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
};

export const HeaderBarFeature = createSyncFeatureTag('HeaderBar');
