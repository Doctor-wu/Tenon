import {
  HeaderBarController, HeaderBarControllerResult,
  IDynamicFeature, Loader, awaitLoad, Controller, HeaderBarType,
} from "@tenon/workbench";
import { HeaderBarName } from "@/configs/header-bar-config";
import { ITitleFeature } from "./title.interface";
import { h } from "vue";

@Controller
export class TitleController {

  @Loader(ITitleFeature)
  titleFeature: IDynamicFeature<ITitleFeature>;

  @HeaderBarController(HeaderBarName.Title)
  @awaitLoad(ITitleFeature)
  async setupTitle(): Promise<HeaderBarControllerResult> {
    const {
      title,
      subTitle,
    } = await this.titleFeature.instance!.getTitle();

    const Title = (await import('./components/title.vue')).default;
    return {
      render: () => h(Title, {
        title,
        subTitle,
      }),
    };
  }
}
