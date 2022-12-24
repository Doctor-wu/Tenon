import {
  Feature
} from "@tenon/workbench";
import { ITitleFeature } from "./title.interface";

@Feature({
  name: ITitleFeature,
})
export class TitleHandler implements ITitleFeature {
  async getTitle() {
    return {
      title: 'Workbench主标题',
      subTitle: 'Workbench副标题',
    }
  }
}
