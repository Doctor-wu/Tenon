import {
  ActionController, HeaderBarController, ToolBarController,
  awaitLoad, IDynamicFeature,
  Loader, UIControllerResult,
  ActionType,
  BarService,
  BarConfig,
} from "@tenon/workbench";
import { HeaderBarName, MoreItemName } from "../../configs/header-bar-config";
import { HeaderBarFeature } from "./headerbar.interface";
import SubTitle from "../../components/sub-title.vue";
import { h } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { ToolBarName } from "../../configs/tool-bar-config";

export class HeaderBarsController {

  @Loader(HeaderBarFeature)
  headerBar: IDynamicFeature<HeaderBarFeature>;

  @Loader(BarService)
  barService: IDynamicFeature<BarConfig>

  @ActionController(HeaderBarName.GithubIcon, ActionType.onClick)
  @awaitLoad(HeaderBarFeature)
  handleGithubIconClick() {
    window.open(this.headerBar.instance!.getGitHubHref(), '_blank');
  }

  @ActionController(MoreItemName.More, ActionType.onClick)
  handleMoreClick() {
    MessagePlugin.success('点击更多');
  }

  @HeaderBarController(HeaderBarName.GithubIcon)
  async updateGithubItemConfig(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      popupText: 'Github: D0ct0r',
      iconName: 'logo-github',
    };
  }

  @HeaderBarController(HeaderBarName.SubTitle)
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

  @ToolBarController(ToolBarName.SaveConfig)
  async updateMode(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      disabled: true,
    };
  }

  @ToolBarController('preview')
  async updatePreview(): Promise<UIControllerResult> {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      disabled: true,
    };
  }

  @ActionController(ToolBarName.MaterialSwitch, ActionType.onActive)
  @awaitLoad(BarService)
  handleMaterialActive() {
    const barService = this.barService.instance!;
    barService.updateToolBarConfig(ToolBarName.ComponentTreeSwitch, {
      active: false,
    });
  }

  @ActionController(ToolBarName.ComponentTreeSwitch, ActionType.onActive)
  @awaitLoad(BarService)
  handleComponentTreeActive() {
    const barService = this.barService.instance!;
    barService.updateToolBarConfig(ToolBarName.MaterialSwitch, {
      active: false,
    });
  }
}