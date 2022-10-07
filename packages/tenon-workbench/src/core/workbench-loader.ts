import { Subscribe } from "@tenon/shared";
import { App } from "vue";
import { WorkbenchEvents } from "./events";
import { DynamicFeatureTag } from "../services/tag";
import { IWorkbench } from "./workbench";
import { BarConfig } from "../configs";


export class WorkbenchLoader implements IWorkbench{
  controllers!: any[];
  eventEmitter!: Subscribe;
  app!: App;
  syncFeatures!: any[];
  dynamicTags!: Set<DynamicFeatureTag>;
  barConfig!: BarConfig;
  load(el: HTMLElement) {
    this.eventEmitter.emit(
      WorkbenchEvents.Load,
      el,
    );
  }
}