import { IWorkbenchAdapter } from './adapter';
import { newable, Subscribe } from '@tenon/shared';
import { DynamicFeatureTag } from './tag';
import { WorkbenchLoader } from './workbench-loader';
import { App } from 'vue';
import { BarConfig, HeaderBarConfig } from './config';
export interface IWorkbenchConfig {
    syncFeatures: any[];
    dynamicTags: DynamicFeatureTag[];
    actionControllers: any[];
    uiControllers: any[];
    headerBarConfig: HeaderBarConfig;
    toolBarConfig: any;
    footBarConfig: any;
    keyBoardConfig: any;
}
export interface IWorkbench {
    app: App;
    syncFeatures: any[];
    dynamicTags: Set<DynamicFeatureTag>;
    actionControllers: any[];
    eventEmitter: Subscribe;
    barConfig: BarConfig;
}
export declare type WorkbenchType = IWorkbenchAdapter & WorkbenchLoader & IWorkbench;
export declare const inheritFromWorkbench: (Target: newable<any, WorkbenchType>, config: IWorkbenchConfig) => {
    new (...args: any[]): {
        app: App;
        syncFeatures: any[];
        dynamicTags: Set<DynamicFeatureTag>;
        actionControllers: any[];
        keyBoardService: any;
        contextService: any;
        eventEmitter: Subscribe;
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