import { newable } from "@tenon/shared";
import { WorkbenchType } from "./workbench";

export interface IPlugin {
  install(workbench: WorkbenchType): void;
}

export class BasePlugin implements IPlugin {
  install(workbench: WorkbenchType): void {
    throw new Error("Method not implemented.");
  }
}
