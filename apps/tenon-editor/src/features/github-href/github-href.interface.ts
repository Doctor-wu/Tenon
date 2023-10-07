import { createDynamicFeatureTag, bindDynamicLoader } from "@tenon/workbench";
import { FeatureName } from "../feature-name";

export interface IGithubHrefFeature {
  // interface
  locateToGithubInBlank: () => void;
}

export const IGithubHrefFeature = createDynamicFeatureTag(FeatureName.GithubHref);

export const GITHUB_HREF_URL = 'https://github.com/Doctor-wu/Tenon';

// bind feature tag here
bindDynamicLoader(IGithubHrefFeature, {
  load: async () => {
    const {
      GithubHrefHandler,
    } = await import('./github-href.handler');
    return GithubHrefHandler;
  }
})
