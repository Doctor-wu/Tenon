import { newable, Subscribe } from "@tenon/shared";
import { App } from "vue";
import { DynamicFeatureTag } from "../services/tag";
import { BarServiceCore, DrawerServiceCore, WorkbenchDIServiceCore } from "../services";
import { IPlugin } from "./base-plugin";
export declare class WorkbenchLoader {
    drawerService: DrawerServiceCore;
    workbenchDIService: WorkbenchDIServiceCore;
    controllers: newable<any, any>[];
    eventEmitter: Subscribe;
    app: App;
    syncFeatures: newable<any, any>[];
    dynamicTags: Set<DynamicFeatureTag>;
    barConfig: BarServiceCore;
    registerPlugin(plugin: IPlugin[]): void;
    load(el: HTMLElement): void;
}
