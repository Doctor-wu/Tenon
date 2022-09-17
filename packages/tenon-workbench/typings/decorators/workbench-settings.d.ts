import { IWorkbenchConfig } from "../core";
import { newable } from '@tenon/shared';
export declare const WorkbenchSettings: <T extends newable<any, any>>(config: IWorkbenchConfig) => (Target: T) => T;
