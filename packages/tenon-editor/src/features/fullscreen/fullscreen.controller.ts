import {
  IDynamicFeature, Loader, Controller,
  ActionController, ActionType, awaitLoad,
} from "@tenon/workbench";
import { IFullScreenFeature } from "./fullscreen.interface";
import { FootBarName } from "@/configs/foot-bar-config";

@Controller({
  name: Symbol('full-screen-controller')
})
export class FullScreenController {

  @Loader(IFullScreenFeature)
  fullScreenFeatureLoader: IDynamicFeature<IFullScreenFeature>;

  get fullScreenFeature() {
    return this.fullScreenFeatureLoader.instance;
  }

  @ActionController(FootBarName.FullScreen, ActionType.onClick)
  @awaitLoad(IFullScreenFeature)
  async toggleFullScreen() {
    await this.fullScreenFeature!.toggleFullScreen();
  }
}
