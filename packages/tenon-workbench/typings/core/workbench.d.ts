import { Subscribe } from '@tenon/shared';
import { DynamicFeatureTag } from './tag';
export interface IWorkbenchConfig {
    syncFeatures: any[];
    dynamicTags: DynamicFeatureTag[];
    actionControllers: any[];
    uiControllers: any[];
    headBarConfig: any;
    toolBarConfig: any;
    footBarConfig: any;
    keyBoardConfig: any;
}
export declare const inheritFromWorkbench: (Target: any, config: IWorkbenchConfig) => {
    new (...args: any[]): {
        [x: string]: any;
        syncFeatures: any[];
        dynamicTags: Set<DynamicFeatureTag>;
        keyBoardService: any;
        contextService: any;
        eventEmitter: Subscribe;
        initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]): void;
        initEvents(): void;
        onLoad(el: HTMLElement): void;
    };
    [x: string]: any;
};
