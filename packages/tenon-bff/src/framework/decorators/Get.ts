import { checkParams, decorateRequest, IRequestOptions } from "./helper";
import Koa from "koa";
import { BaseController } from "../controller";

export function Get(requestPath: string, requestOptions: IRequestOptions = {}) {
  const { params: paramsConfig = {} } = requestOptions;

  return function getDecorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originCb = descriptor.value;
    const newCb = function (this: BaseController, ctx: Koa.Context, next: Koa.Next) {
      const request = ctx.request;
      const params = Object.assign({}, request.query, (request as any).params || {});
      const [success, errorMsg, errorCode] = checkParams(paramsConfig, params);
      if (!success) {
        return this.responseError(ctx, next)(errorCode as number, errorMsg as string);
      }
      originCb.call(this, ctx, next, params);
    }
    decorateRequest(target, newCb, {
      requestPath,
      requestMethod: "get",
      handlerDesc: `${target.constructor.name}.${propertyKey}`
    });
  }
}