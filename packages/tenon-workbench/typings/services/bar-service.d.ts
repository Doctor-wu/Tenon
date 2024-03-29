import { IDynamicFeature } from "../decorators";
import { ContextServiceCore, EventEmitterCore } from "../services";
import { HeaderBarConfig, HeaderBarItemType } from "../interfaces/header-bar-config";
import { ToolBarConfig, ToolBarItemType, ToolBarFlag } from "../interfaces/tool-bar-config";
import { ActionFrom } from './action-info-service';
import { FootBarConfig, FootBarItemType, IToolBarBaseConfig } from '../interfaces';
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
    setSwitchActive(switchName: string, active: boolean): void;
    getSwitchActive(switchName: string): boolean;
    private resolveHeaderBar;
    private resolveToolBar;
    private resolveFootBarConfig;
    private recursiveListTree;
    get headerBarConfig(): HeaderBarConfig;
    get toolBarConfig(): ToolBarConfig;
    get footBarConfig(): FootBarConfig;
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, from: ActionFrom, ...args: any[]): Promise<void>;
    setToolBarItemLoading(name: any, loading: boolean): Promise<void>;
    updateHeaderBarConfig(name: any, partial: Partial<HeaderBarItemType>): void;
    updateToolBarConfig<Config extends IToolBarBaseConfig<ToolBarFlag> = ToolBarItemType>(name: any, partial: Partial<Config>): void;
    updateFootBarConfig(name: any, partial: Partial<FootBarItemType>): void;
}
