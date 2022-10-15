import { Feature } from "@tenon/workbench";
import { HeaderBarFeature } from "./headerbar.interface";


@Feature({
  name: HeaderBarFeature
})
export class HeaderBarHandler implements HeaderBarFeature {
  
  public isFullScreen = false;

  public getGitHubHref() {
    return 'https://github.com/Doctor-wu/Tenon';
  }

  public toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }
}