import { Feature, IDynamicFeature, Loader } from "@tenon/workbench";
import { FeatureCFeature } from "../feature-c";
import { FeatureBFeature } from "./feature-b.interface";


@Feature({
  name: FeatureBFeature
})
export class FeatureBHandler {
  constructor() {
    setTimeout(async () => {
      const instance = await this.featureC.getInstance();
      instance.invokeC();
    }, 3000);
  }

  @Loader(FeatureCFeature)
  featureC!: IDynamicFeature<FeatureCFeature>;

  invokeB() {
    console.log('invoke B!');
  }
}