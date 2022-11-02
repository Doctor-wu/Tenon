import { Feature, IDynamicFeature, Loader, awaitLoad } from "@tenon/workbench";
import { FeatureCFeature } from "../feature-c";
import { FeatureBFeature } from "./feature-b.interface";


@Feature({
  name: FeatureBFeature
})
export class FeatureBHandler implements FeatureBFeature{
  constructor() {
    setTimeout(async () => {
      const instance = await this.featureC.getInstance();
      instance.invokeC();
    }, 3000);
  }

  @Loader(FeatureCFeature)
  featureC!: IDynamicFeature<FeatureCFeature>;

  @awaitLoad(FeatureCFeature)
  invokeB() {
    console.log('invoke B!');
  }
}