import { IWorkbenchConfig, inheritFromWorkbench, WorkbenchType } from "../core";
import { newable } from '@tenon/shared';

export const WorkbenchSettings = <T extends newable<any, WorkbenchType>>(config: IWorkbenchConfig) => {

  return (Target: T) => {
    return inheritFromWorkbench(Target, config);
  }
}
