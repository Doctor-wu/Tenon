import {
  HeaderBarController, HeaderBarControllerResult,
  IDynamicFeature, Loader, awaitLoad, Controller,
} from "@tenon/workbench";
import { HeaderBarName } from "@/configs/header-bar-config";
import { ITitleFeature } from "./title.interface";
import { h } from "vue";

@Controller()
export class TitleController {

  @Loader(ITitleFeature)
  titleFeatureLoader: IDynamicFeature<ITitleFeature>;

  get titleFeature() {
    return this.titleFeatureLoader.instance;
  }

  @HeaderBarController(HeaderBarName.Title)
  @awaitLoad(ITitleFeature)
  async setupTitle(): Promise<HeaderBarControllerResult> {
    const {
      title,
      subTitle,
    } = await this.titleFeature!.getTitle();

    const Title = (await import('./components/title.vue')).default;
    return {
      render: () => h(Title, {
        title,
        subTitle,
        titleFeature: this.titleFeature!,
      }),
    };
  }
}
