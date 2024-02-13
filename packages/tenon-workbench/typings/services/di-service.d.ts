import { DIState } from "@tenon/shared";
export declare const WorkbenchDIService: symbol;
export declare class WorkbenchDIServiceCore extends DIState {
    private pendingMap;
    get<T>(serviceName: any, ...args: any[]): Promise<T | undefined>;
}
