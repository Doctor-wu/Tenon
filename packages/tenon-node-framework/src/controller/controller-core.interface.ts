import { RequestContext, tenonAppType } from "../core";

export interface IDecoratedControllerExtraFields {
  ControllerName: string;
  // prefixPath: string;
  app: tenonAppType;
}

export type TypeMiddleware<T = [false, string] | [true]> = (options: { ctx: RequestContext, params: any }) => T | Promise<T>;