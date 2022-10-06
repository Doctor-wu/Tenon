import { Subscribe } from "@tenon/shared";
import { App } from "vue";
import { BarConfig } from "./config";
import { DynamicFeatureTag } from "../services/tag";
import { IWorkbench } from "./workbench";
export declare class WorkbenchLoader implements IWorkbench {
    controllers: any[];
    eventEmitter: Subscribe;
    app: App;
    syncFeatures: any[];
    dynamicTags: Set<DynamicFeatureTag>;
    barConfig: BarConfig;
    load(el: HTMLElement): void;
}
