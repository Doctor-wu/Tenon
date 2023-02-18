import {
  IDynamicFeature,
  Loader,
  Controller,
  ActionController,
  ActionType,
  awaitLoad,
  FootBarController,
  FootBarControllerResult,
} from "@tenon/workbench";
import { IFullScreenFeature } from "./fullscreen.interface";
import { FootBarName } from "@/configs/foot-bar-config";
import { FullScreen } from "./reactive";
import { ExitFullScreenConfig, FullScreenConfig } from "./configs";

@Controller({
  name: Symbol("full-screen-controller"),
})
export class FullScreenController {
  @Loader(IFullScreenFeature)
  fullScreenFeatureLoader: IDynamicFeature<IFullScreenFeature>;

  get fullScreenFeature() {
    return this.fullScreenFeatureLoader.instance;
  }

  @FootBarController(FootBarName.FullScreen, [FullScreen])
  async getFullScreenConfig(): Promise<FootBarControllerResult> {
    return FullScreen.value ? ExitFullScreenConfig : FullScreenConfig;
  }

  @ActionController(FootBarName.FullScreen, ActionType.onClick)
  @awaitLoad(IFullScreenFeature)
  async toggleFullScreen() {
    await this.fullScreenFeature!.toggleFullScreen();
  }
}
