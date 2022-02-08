import { BaseController } from "../controller";
import { checkParams, decorateRequest, IRequestOptions } from "./helper";
import Koa from "koa";

export function Post(requestPath: string, requestOptions: IRequestOptions = {}) {
  const { params: paramsConfig = {} } = requestOptions;

  return function postDecorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originCb = descriptor.value;
    const newCb = function (this: BaseController, ctx: Koa.Context, next: Koa.Next) {
      const request = ctx.request;
      const params = Object.assign({}, (request as any).body || {}, (request as any).params || {});
      const [success, errorMsg, errorCode] = checkParams(paramsConfig, params);
      if (!success) {
        return this.responseError(ctx, next)(errorCode as number, errorMsg as string);
      }
      originCb.call(this, ctx, next, params);
    }
    decorateRequest(target, newCb, {
      requestPath,
      requestMethod: "post",
      handlerDesc: `${target.constructor.name}.${propertyKey}`
    });
  }
}