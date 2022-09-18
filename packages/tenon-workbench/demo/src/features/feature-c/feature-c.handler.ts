import { Feature } from "@tenon/workbench";
import { FeatureCFeature } from "./feature-c.interface";


@Feature({
  name: FeatureCFeature
})
// @ts-ignore
export class FeatureCHandler implements FeatureCFeature{

  constructor() {
    console.log('C is coming!')
  }

  invokeC() {
    console.log('invoke C');
  }

}