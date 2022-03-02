import { BaseController } from "../../controller";
import { IDecoratedControllerExtraFields, TypeMiddleware } from "../../controller/controller-core.interface";

export interface IDecoratedController{
  new(...args: any[]): BaseController & IDecoratedControllerExtraFields;
  prefixPath: string;
}


export interface IControllerConfig {
  prefixPath: string;
  name?: string;
  middleware?: TypeMiddleware[];
}

// export interface IDecorated
