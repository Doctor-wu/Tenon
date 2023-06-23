import {
  Feature
} from "@tenon/workbench";
import { ITitleFeature } from "./title.interface";
import { sleep } from "@tenon/shared";

@Feature({
  name: ITitleFeature,
})
export class TitleHandler implements ITitleFeature {
  async getTitle() {
    await sleep(1000);
    return {
      title: 'Workbench主标题',
      subTitle: 'Workbench副标题',
    }
  }
}
