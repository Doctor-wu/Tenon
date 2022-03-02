import { checkParams, createRequest, IRequestOptions } from "./helper";
import Koa from "koa";
import { BaseController } from "../../controller";
import { asyncCompose } from "@tenon/shared";
import { getControllerStore } from "../../controller/registry";
import { RequestContext, RequestNext } from "../../core";
import { processMiddleWare } from "./utils";

export function Get<P = any>(requestPath: string, requestOptions: IRequestOptions = {}) {
  const { params: paramsConfig = {} } = requestOptions;

  return function getDecorator(target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
    const originCb = descriptor.value;
    const newCb = async function (this: BaseController, ctx: Koa.Context, next: Koa.Next) {
      /** 获取参数 */
      const request = ctx.request;
      const params = Object.assign({}, request.query, (request as any).params || {});
      /** 获取参数 */

      /** 检查参数 */
      const [success, errorMsg, errorCode] = checkParams(paramsConfig, params);
      if (!success) {
        return this.responseError(ctx, next)(errorCode as number, errorMsg as string);
      }

      /** 处理中间件 */
      const store = getControllerStore(this.ControllerName);
      const middleware = this.middleware.concat();
      middleware.unshift(...(store.middleware?.[propertyKey] || []));
      const [access, reason] = await processMiddleWare(middleware, ctx, params);
      if (access === false) return this.responseError(ctx, next)(1111, reason as string);
      /** 处理中间件 */

      await originCb.call(this, ctx, next, params as P); // 调用源函数
    };

    createRequest(target, newCb, {
      requestPath,
      requestMethod: "get",
      handlerDesc: `${target.constructor.name}.${propertyKey}`,
    });
  } as MethodDecorator;
}