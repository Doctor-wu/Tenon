import { checkParams, createRequest, IRequestOptions } from "./helper";
import Koa from "koa";
import { BaseController } from "../../controller";

export function Delete<P = any>(requestPath: string, requestOptions: IRequestOptions = {}) {
  const { params: paramsConfig = {} } = requestOptions;

  return function deleteDecorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
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
      /** 检查参数 */

      await originCb.call(this, ctx, next, params as P); // 调用源函数
    };

    createRequest(target, newCb, {
      requestPath,
      requestMethod: "delete",
      handlerDesc: `${target.constructor.name}.${propertyKey}`,
    });
  } as MethodDecorator;
}