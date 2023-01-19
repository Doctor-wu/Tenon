import { IDynamicFeature } from "../decorators";
import { ContextServiceCore, EventEmitterCore } from "../services";
import { HeaderBarConfig, HeaderBarItemType } from "../configs/header-bar-config";
import { ToolBarConfig, ToolBarItemType } from "../configs/tool-bar-config";
import { ActionFrom } from './action-info-service';
import { FootBarConfig, FootBarItemType } from '../configs';
export declare const BarService: symbol;
export declare class BarServiceCore {
    private headerBarConfigInit;
    private toolBarConfigInit;
    private footBarConfigInit;
    actionMap: Map<any, {
        [props: string]: Function[];
    }>;
    headerBarNameMap: Map<any, HeaderBarItemType>;
    toolBarNameMap: Map<any, ToolBarItemType>;
    footBarNameMap: Map<any, FootBarItemType>;
    contextService: ContextServiceCore;
    eventEmitter: IDynamicFeature<EventEmitterCore>;
    constructor(headerBarConfigInit: HeaderBarConfig, toolBarConfigInit: ToolBarConfig, footBarConfigInit: FootBarConfig);
    init(): void;
    private resolveHeaderBar;
    private resolveToolBar;
    private resolveFootBarConfig;
    private recursiveListTree;
    get headerBarConfig(): HeaderBarConfig;
    get toolBarConfig(): ToolBarConfig;
    get footBarConfig(): FootBarConfig;
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, from: ActionFrom, ...args: any[]): Promise<void>;
    updateHeaderBarConfig(name: any, partial: Partial<HeaderBarItemType>): void;
    updateToolBarConfig(name: any, partial: Partial<ToolBarItemType>): void;
    updateFootBarConfig(name: any, partial: Partial<FootBarItemType>): void;
}
