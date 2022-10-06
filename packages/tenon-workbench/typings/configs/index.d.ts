import { ContextServiceCore } from "../services";
import { HeaderBarConfig, IHeaderBarItem } from "./header-bar-config";
export * from "./header-bar-config";
export declare const BarService: symbol;
export declare class BarConfig {
    private headerBarConfigInit;
    actionMap: Map<any, {
        [props: string]: Function[];
    }>;
    contextService: ContextServiceCore;
    constructor(headerBarConfigInit: HeaderBarConfig);
    init(): void;
    get headerBarConfig(): any;
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, ...args: any[]): void;
    updateUIConfig(name: any, partial: Partial<IHeaderBarItem>): void;
}
