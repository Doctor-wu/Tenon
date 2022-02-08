import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import { IDecoratedControllerExtraFields } from "./controller.interface";
import Koa from "koa";
import { createErrorJson, createResponseJson } from "./response";
import { compose } from "@tenon/shared";

let appInstance: tenonAppType;

export const initControllers = (app: tenonAppType) => {
  appInstance = app;
  const { controllers } = app.$config;
  app.$controllers = {};
  // 实例化Controllers
  controllers.forEach(Controller => {
    app.$controllers![Controller.name] = new Controller;
  });
  io.log('Controller initd');
  // 收集完路由后装载路由
  app.$router?.buildRoutes();
  // 打印路由列表
  app.$router?.routeList.forEach(([requestMethod, handlerDesc, requestPath]) => {
    io.log(
      compose(io.bold, io.successStyle)(`【${requestMethod.toUpperCase()} ${requestPath}】`),
      io.logStyle("->"),
      io.logStyle(`${handlerDesc}`),
    );
  });
}

export class BaseController implements IDecoratedControllerExtraFields {
  public app: tenonAppType;
  public prefixPath!: string;
  public handlers!: ((instance: BaseController) => void)[]; // Get/Post 类的请求装饰器会给Controller的原型上添加handlers属性

  constructor() {
    this.app = appInstance;
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
    }
  }
}