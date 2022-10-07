import {
  ActionController, UIController,
  awaitLoad, IDynamicFeature,
  Loader, UIControllerResult,
  ActionType,
} from "@tenon/workbench";
import { HeaderBarName, MoreItemName } from "../../configs/header-bar-config";
import { HeaderBarFeature } from "./headerbar.interface";
import SubTitle from "../../components/sub-title.vue";
import { h } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { ToolBarName } from "../../configs/tool-bar-config";

export class HeaderBarController {

  @Loader(HeaderBarFeature)
  headerBar: IDynamicFeature<HeaderBarFeature>;

  @ActionController(HeaderBarName.GithubIcon, ActionType.onClick)
  @awaitLoad(HeaderBarFeature)
  handleGithubIconClick() {
    window.open(this.headerBar.instance!.getGitHubHref(), '_blank');
  }

  @ActionController(MoreItemName.More, ActionType.onClick)
  handleMoreClick() {
    MessagePlugin.success('点击更多');
  }

  @UIController(HeaderBarName.GithubIcon, 'headerBarConfig')
  async updateGithubItemConfig(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      popupText: 'Github: D0ct0r',
      iconName: 'logo-github',
    };
  }

  @UIController(HeaderBarName.SubTitle, 'headerBarConfig')
  async updateSubTitle(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      render: () => h(SubTitle, {
        text: 'Workbench副标题 (updated)',
        key: Math.random(),
        style: {
          alignSelf: 'flex-end',
          marginBottom: '5px',
        },
      }),
    };
  }

  @UIController(ToolBarName.SaveConfig, 'toolBarConfig')
  async updateMode():Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      disabled: true,
    }; 
  }
}