import { Feature } from "@tenon/workbench";
import { HeaderBarFeature } from "./headerbar.interface";


@Feature({
  name: HeaderBarFeature
})
export class HeaderBarHandler implements HeaderBarFeature {

  public getGitHubHref () {
    return 'https://github.com/Doctor-wu/Tenon';
  }
}