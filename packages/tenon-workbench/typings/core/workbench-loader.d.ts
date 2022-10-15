import { newable, Subscribe } from "@tenon/shared";
import { App } from "vue";
import { DynamicFeatureTag } from "../services/tag";
import { IWorkbench } from "./workbench";
import { BarServiceCore, WorkbenchDIServiceCore } from "../services";
export declare class WorkbenchLoader implements IWorkbench {
    workbenchDIService: WorkbenchDIServiceCore;
    controllers: newable<any, any>[];
    eventEmitter: Subscribe;
    app: App;
    syncFeatures: newable<any, any>[];
    dynamicTags: Set<DynamicFeatureTag>;
    barConfig: BarServiceCore;
    load(el: HTMLElement): void;
}
