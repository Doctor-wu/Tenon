import {
  ActionController, UIController,
  awaitLoad, IDynamicFeature, IHeaderBarType, Loader,
  UIControllerResult,
} from "@tenon/workbench";
import { HeaderBarFeature } from "./headerbar.interface";

export class HeaderBarController {

  @Loader(HeaderBarFeature)
  headerBar: IDynamicFeature<HeaderBarFeature>;

  @ActionController('github-icon', 'onClick')
  @awaitLoad(HeaderBarFeature)
  handleGithubIconClick() {
    window.open(this.headerBar.instance!.getGitHubHref(), '_blank');
  }


  @UIController('github-icon')
  async updateGithubItemConfig(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      popupText: 'Github: D0ct0r',
      iconName: 'logo-github',
    };
  }
}