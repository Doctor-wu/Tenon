import { Feature, Inject } from "@tenon/workbench";
import { FeatureBFeature } from "../feature-b";
import { FeatureAFeature } from "./feature-a.interface";


@Feature({
  name: FeatureAFeature
})
export class FeatureAHandler implements FeatureAFeature {
  constructor(
    @Inject(FeatureBFeature) private featureB: FeatureBFeature,
  ) {
    console.log(featureB);
    this.invokeA();
    setTimeout(() => {
      this.featureB.invokeB();
    }, 1500);
  }

  invokeA() {
    console.log('invoke A!');
  }
}