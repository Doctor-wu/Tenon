import { Subscribe } from "@tenon/shared";
import { App } from "vue";
import { BarConfig } from "./config";
import { WorkbenchEvents } from "./events";
import { DynamicFeatureTag } from "./tag";
import { IWorkbench } from "./workbench";


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