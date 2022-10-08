import { IDynamicFeature } from "../decorators";
import { ContextServiceCore, EventEmitterCore } from "../services";
import { HeaderBarConfig, IHeaderBarItem } from "../configs/header-bar-config";
import { ToolBarConfig, ToolBarConfigType } from "../configs/tool-bar-config";
export declare const BarService: symbol;
export declare class BarConfig {
    private headerBarConfigInit;
    private toolBarConfigInit;
    actionMap: Map<any, {
        [props: string]: Function[];
    }>;
    headerBarNameMap: Map<any, IHeaderBarItem>;
    toolbarNameMap: Map<any, ToolBarConfigType>;
    contextService: ContextServiceCore;
    eventEmitter: IDynamicFeature<EventEmitterCore>;
    constructor(headerBarConfigInit: HeaderBarConfig, toolBarConfigInit: ToolBarConfig);
    init(): void;
    private recursiveHeaderBar;
    private recursiveToolBar;
    private recursiveListTree;
    get headerBarConfig(): HeaderBarConfig;
    get toolBarConfig(): ToolBarConfig;
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, ...args: any[]): void;
    updateHeaderBarConfig(name: any, partial: Partial<IHeaderBarItem>): void;
    updateToolBarConfig(name: any, partial: Partial<ToolBarConfigType>): void;
}
