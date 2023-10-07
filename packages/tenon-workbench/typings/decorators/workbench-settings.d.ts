import { IWorkbenchConfig, WorkbenchType } from "../core";
import { newable } from '@tenon/shared';
export declare const WorkbenchSettings: <T extends newable<any, WorkbenchType>>(config: IWorkbenchConfig) => (Target: T) => import("../core").IWorkbenchAdapter & import("../core").WorkbenchLoader & import("../core").IWorkbench & T;
