import { WorkbenchDIServiceCore } from '../services/di-service';
import { IWorkbenchAdapter } from './adapter';
import { newable } from '@tenon/shared';
import { DynamicFeatureTag } from '../services/tag';
import { WorkbenchLoader } from './workbench-loader';
import { App } from 'vue';
import { BarConfig, HeaderBarConfig } from './config';
import { EventEmitterCore } from '../services/event-emitter';
export interface IWorkbenchConfig {
    syncFeatures: any[];
    dynamicTags: DynamicFeatureTag[];
    controllers: any[];
    headerBarConfig: HeaderBarConfig;
    toolBarConfig: any;
    footBarConfig: any;
    keyBoardConfig: any;
}
export interface IWorkbench {
    app: App;
    syncFeatures: any[];
    dynamicTags: Set<DynamicFeatureTag>;
    controllers: any[];
    eventEmitter: EventEmitterCore;
    barConfig: BarConfig;
}
export declare type WorkbenchType = IWorkbenchAdapter & WorkbenchLoader & IWorkbench;
export declare const WorkbenchService: symbol;
export declare const inheritFromWorkbench: (Target: newable<any, WorkbenchType>, config: IWorkbenchConfig) => {
    new (...args: any[]): {
        app: App;
        syncFeatures: any[];
        dynamicTags: Set<DynamicFeatureTag>;
        controllers: any[];
        keyBoardService: any;
        contextService: any;
        eventEmitter: EventEmitterCore;
        workbenchDIState: WorkbenchDIServiceCore;
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
