import { BarConfig, createSyncFeatureTag } from "@tenon/workbench";


export interface HeaderBarFeature {
  // interface
  getGitHubHref(): string;
};

export const HeaderBarFeature = createSyncFeatureTag('HeaderBar');
