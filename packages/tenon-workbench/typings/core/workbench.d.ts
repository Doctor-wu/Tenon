import { DynamicFeatureTag } from "./tag";
export interface IWorkbenchConfig {
    el: HTMLElement;
    adapter: any;
    syncFeatures: any[];
    dynamicTags: DynamicFeatureTag[];
    actionControllers: any[];
    uiControllers: any[];
    headBarConfig: any;
    toolBarConfig: any;
    footBarConfig: any;
    editorGrid: any;
    keyBoardConfig: any;
}
export declare class Workbench<Editor extends unknown> {
    private editor?;
    private syncFeatures;
    private dynamicTags;
    keyBoardService: any;
    contextService: any;
    constructor(config: IWorkbenchConfig);
    initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]): void;
}
