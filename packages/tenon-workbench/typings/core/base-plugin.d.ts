import { WorkbenchType } from "./workbench";
export interface IPlugin {
    install(workbench: WorkbenchType): void;
}
export declare class BasePlugin implements IPlugin {
    install(workbench: WorkbenchType): void;
}
