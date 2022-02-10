import { IDecoratedControllerExtraFields } from "../../controller/controller-core.interface";

export interface IDecoratedController {
  new(...args: any[]): IDecoratedControllerExtraFields
}


export interface IControllerConfig {
  prefixPath: string;
  name?: string;
}
