import { ContextServiceCore } from "../services";
import { HeaderBarConfig, IHeaderBarItem } from "./header-bar-config";
import { ToolBarConfig } from "./tool-bar-config";
export * from "./header-bar-config";
export * from "./tool-bar-config";
export declare const BarService: symbol;
export declare class BarConfig {
    private headerBarConfigInit;
    private toolBarConfigInit;
    actionMap: Map<any, {
        [props: string]: Function[];
    }>;
    contextService: ContextServiceCore;
    constructor(headerBarConfigInit: HeaderBarConfig, toolBarConfigInit: ToolBarConfig);
    init(): void;
    get headerBarConfig(): any;
    get toolBarConfig(): any;
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, ...args: any[]): void;
    updateUIConfig(name: any, bar: 'headerBarConfig' | 'toolBarConfig', partial: Partial<IHeaderBarItem>): void;
}
