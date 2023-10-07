import {
  Feature
} from "@tenon/workbench";
import { GITHUB_HREF_URL, IGithubHrefFeature } from "./github-href.interface";

@Feature({
  name: IGithubHrefFeature,
})
export class GithubHrefHandler implements IGithubHrefFeature {
  locateToGithubInBlank() {
    window.open(GITHUB_HREF_URL, 'blank');
  }
}
