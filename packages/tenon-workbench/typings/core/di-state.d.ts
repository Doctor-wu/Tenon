import { DIState } from "@tenon/shared";
export declare class WorkbenchDIState extends DIState {
    get<T>(serviceName: any, ...args: any[]): Promise<T | undefined>;
}
export declare const workbenchDIState: WorkbenchDIState;
