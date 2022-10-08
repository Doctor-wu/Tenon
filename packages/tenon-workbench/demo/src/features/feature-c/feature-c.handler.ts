import { 
  Feature, Inject, WorkbenchDIService, WorkbenchDIServiceCore,
  WorkbenchService, WorkbenchType, BarService, BarConfig
  } from "@tenon/workbench";
import { ToolBarName } from "../../configs/tool-bar-config";
import { FeatureCFeature } from "./feature-c.interface";


@Feature({
  name: FeatureCFeature
})
// @ts-ignore
export class FeatureCHandler implements FeatureCFeature{

  constructor(
    @Inject(WorkbenchService) workbenchService: WorkbenchType,
    @Inject(WorkbenchDIService) workbenchDIService: WorkbenchDIServiceCore,
    @Inject(BarService) barService: BarConfig,
  ) {
    console.log('C is coming!');
    console.log(workbenchService, workbenchDIService, barService);
    barService.updateToolBarConfig(ToolBarName.Events, {
      disabled: true,
    });
  }

  invokeC() {
    console.log('invoke C');
  }

}