import { WorkbenchDIServiceCore, BarServiceCore, EventEmitterCore, DynamicFeatureTag, DrawerServiceCore } from '../services';
import { IWorkbenchAdapter } from './adapter';
import { newable } from '@tenon/shared';
import { WorkbenchLoader } from './workbench-loader';
import { type App } from 'vue';
import { HeaderBarConfig, ToolBarConfig } from '../interfaces';
import { IPlugin } from './base-plugin';
export interface IWorkbenchConfig {
    syncFeatures: newable<any, any>[];
    dynamicTags: DynamicFeatureTag[];
    controllers: newable<any, any>[];
    headerBarConfig: HeaderBarConfig;
    toolBarConfig: ToolBarConfig;
    footBarConfig: any;
}
export interface IWorkbench {
    app: App;
    syncFeatures: newable<any, any>[];
    dynamicTags: Set<DynamicFeatureTag>;
    controllers: newable<any, any>[];
    eventEmitter: EventEmitterCore;
    barConfig: BarServiceCore;
    workbenchDIService: WorkbenchDIServiceCore;
    drawerService: DrawerServiceCore;
    registerPlugin(plugins: IPlugin[]): void;
}
type ComposeWorkbench<A extends {}, W extends {}, I extends {}> = A & W & I;
export type WorkbenchType = ComposeWorkbench<IWorkbenchAdapter, WorkbenchLoader, IWorkbench>;
export declare const WorkbenchService: symbol;
export declare const inheritFromWorkbench: (Target: newable<any, WorkbenchType>, config: IWorkbenchConfig) => {
    new (...args: any[]): {
        app: App;
        syncFeatures: newable<any, any>[];
        dynamicTags: Set<DynamicFeatureTag>;
        controllers: newable<any, any>[];
        keyBoardService: any;
        contextService: any;
        eventEmitter: EventEmitterCore;
        workbenchDIService: WorkbenchDIServiceCore;
        barConfig: BarServiceCore;
        drawerService: DrawerServiceCore;
        initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]): void;
        initControllers(): void;
        initEvents(): void;
        onLoad(el: HTMLElement): void;
        render(el: any): void;
        registerPlugin(plugins: IPlugin[]): void;
        editor: any;
        attachEditor(dom: HTMLElement): void;
        load(el: HTMLElement): void;
    };
};
export {};
