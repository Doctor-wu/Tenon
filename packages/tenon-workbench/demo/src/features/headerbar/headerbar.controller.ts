import {
  ActionController, UIController,
  awaitLoad, IDynamicFeature,
  Loader, UIControllerResult,
  ActionType,
} from "@tenon/workbench";
import { HeaderBarName } from "../../configs/header-bar-config";
import { HeaderBarFeature } from "./headerbar.interface";
import SubTitle from "../../components/sub-title.vue";
import { h } from "vue";

export class HeaderBarController {

  @Loader(HeaderBarFeature)
  headerBar: IDynamicFeature<HeaderBarFeature>;

  @ActionController(HeaderBarName.GithubIcon, ActionType.onClick)
  @awaitLoad(HeaderBarFeature)
  handleGithubIconClick() {
    window.open(this.headerBar.instance!.getGitHubHref(), '_blank');
  }


  @UIController(HeaderBarName.GithubIcon)
  async updateGithubItemConfig(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      popupText: 'Github: D0ct0r',
      iconName: 'logo-github',
    };
  }

  @UIController(HeaderBarName.SubTitle)
  async updateSubTitle(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      render: () => h(SubTitle, {
        text: 'Workbench副标题 (updated)',
        key: Math.random(),
      }),
    };
  }
}