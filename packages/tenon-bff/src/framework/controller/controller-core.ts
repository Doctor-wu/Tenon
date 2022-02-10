import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import Koa from "koa";
import { createErrorJson, createResponseJson } from "./response";
import { compose } from "@tenon/shared";
import { IDecoratedControllerExtraFields } from "./controller-core.interface";

export const initControllers = (app: tenonAppType) => {
  const { controllers } = app.$config;
  app.$controllers = {};

  /** 实例化Controllers */
  controllers.forEach(Controller => {
    const instance = new Controller(app);
    app.$controllers![instance.ControllerName] = instance;
    io.log(`- ${instance.ControllerName}`);
  });

  io.log(
    compose(io.bold, io.hex('#05f'))('Controller initd')
  );

  /** 打印路由列表 */
  app.$router?.routeList.forEach(([requestMethod, handlerDesc, requestPath]) => {
    io.log(
      compose(io.bold, io.successStyle)(`【 ${requestMethod.toUpperCase()} ${requestPath} 】`),
      io.logStyle(`${handlerDesc}`),
    );
  });

  /** 收集完路由后装载路由 */
  app.$router?.buildRoutes();

  io.log(
    compose(io.bold, io.hex('#05f'))('Router initd')
  );
}

export class BaseController implements IDecoratedControllerExtraFields {
  protected app: tenonAppType;
  /** Get/Post 类的请求装饰器会给Controller的原型上添加handlers属性 */
  protected handlers!: ((instance: BaseController) => void)[];
  /** Controller装饰器会为子类加上该属性 */
  public ControllerName!: string;
  public prefixPath!: string;

  constructor(app: tenonAppType) {
    this.app = app;
  }

  response(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    return async function (data: any) {
      ctx.body = data;
      await next();
    }
  }

  responseJson(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    return async function (data: any) {
      const responseJson = createResponseJson(data);
      ctx.body = responseJson;
      await next();
      io.log(responseJson);
    }
  }

  responseError(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    return async function (errorCode: number, errorMsg: string) {
      const errorJson = createErrorJson(errorCode, errorMsg);
      ctx.body = errorJson;
      await next();
      io.log(errorJson);
    }
  }
}