import { IWorkbenchConfig, WorkbenchType } from "../core";
import { newable } from '@tenon/shared';
export declare const WorkbenchSettings: <T extends newable<any, WorkbenchType>>(config: IWorkbenchConfig) => (Target: T) => {
    new (...args: any[]): {
        app: import("vue").App<any>;
        syncFeatures: newable<any, any>[];
        dynamicTags: Set<symbol>;
        controllers: newable<any, any>[];
        keyBoardService: any;
        contextService: any;
        eventEmitter: import("..").EventEmitterCore;
        workbenchDIService: import("..").WorkbenchDIServiceCore;
        barConfig: import("..").BarServiceCore;
        drawerService: import("..").DrawerServiceCore;
        initFeatureTags(syncFeatures: any[], dynamicTags: symbol[]): void;
        initControllers(): void;
        initEvents(): void;
        onLoad(el: HTMLElement): void;
        render(el: any): void;
        registerPlugin(plugins: import("../core").IPlugin[]): void;
        editor: any;
        attachEditor(dom: HTMLElement): void;
        load(el: HTMLElement): void;
    };
};
