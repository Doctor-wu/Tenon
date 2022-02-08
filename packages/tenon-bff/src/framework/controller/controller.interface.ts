import { BaseController } from "./controller";

export interface IDecoratedController {
  new(...args: any[]): IDecoratedControllerExtraFields
}

export interface IDecoratedControllerExtraFields {
  prefixPath: string;
  handlers: ((instance: BaseController) => void)[];
}

export interface IControllerConfig {
  prefixPath: string;
}
