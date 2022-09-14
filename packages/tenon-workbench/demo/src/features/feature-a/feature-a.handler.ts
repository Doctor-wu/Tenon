import { Feature, Inject } from "@tenon/workbench";
import { FeatureBFeature } from "../feature-b";
import { FeatureAFeature } from "./feature-a.interface";


@Feature({
  name: FeatureAFeature
})
export class FeatureAHandler {
  constructor(
    @Inject(FeatureBFeature) private featureB: FeatureBFeature,
  ) {
    console.log(featureB);
    featureB.invokeB();
  }
}