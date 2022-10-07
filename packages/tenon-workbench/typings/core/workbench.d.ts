import { WorkbenchDIServiceCore } from '../services/di-service';
import { IWorkbenchAdapter } from './adapter';
import { newable } from '@tenon/shared';
import { DynamicFeatureTag } from '../services/tag';
import { WorkbenchLoader } from './workbench-loader';
import { type App } from 'vue';
import { EventEmitterCore } from '../services/event-emitter';
import { BarConfig, HeaderBarConfig, ToolBarConfig } from '../configs';
export interface IWorkbenchConfig {
    syncFeatures: newable<any, any>[];
    dynamicTags: DynamicFeatureTag[];
    controllers: newable<any, any>[];
    headerBarConfig: HeaderBarConfig;
    toolBarConfig: ToolBarConfig;
    footBarConfig: any;
    keyBoardConfig: any;
}
export interface IWorkbench {
    app: App;
    syncFeatures: newable<any, any>[];
    dynamicTags: Set<DynamicFeatureTag>;
    controllers: newable<any, any>[];
    eventEmitter: EventEmitterCore;
    barConfig: BarConfig;
}
export declare type WorkbenchType = IWorkbenchAdapter & WorkbenchLoader & IWorkbench;
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
        barConfig: BarConfig;
        initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]): void;
        initControllers(): void;
        initEvents(): void;
        onLoad(el: HTMLElement): void;
        render(el: any): void;
        attachEditor(dom: HTMLElement): void;
        load(el: HTMLElement): void;
    };
};
