import { inheritFromWorkbench } from './../core/workbench';
import { IWorkbenchConfig, WorkbenchLoader } from "../core";
import { newable } from '@tenon/shared';

export const WorkbenchSettings = <T extends newable<any, any>>(config: IWorkbenchConfig) => {

  return (Target: T) => {
    return inheritFromWorkbench(Target, config) as T;
  }
}