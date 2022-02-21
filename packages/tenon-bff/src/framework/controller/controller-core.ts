import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import Koa from "koa";
import { createErrorJson, createResponseJson } from "./response";
import { compose } from "@tenon/shared";
import { IDecoratedControllerExtraFields } from "./controller-core.interface";
import { IDecoratedController } from "../decorators/controller-decorators/Controller.interface";
import { arrayType } from "@tenon/shared";

export const initControllers = (app: tenonAppType) => {
  const { controllers } = app.$config;
  if (!controllers) return;
  app.$controllers = {};

  /** 实例化Controllers */
  controllers.forEach(Controller => {
    createControllerInstance(app, Controller);
  });

  compose(io.moduleStyle, io.log)('Controller initd');

  /** 打印路由列表 */
  app.$router?.routeList.forEach(([requestMethod, handlerDesc, requestPath]) => {
    io.log(
      compose(io.bold, io.successStyle)(`【 ${requestMethod.toUpperCase()} ${requestPath} 】`),
      io.logStyle(`${handlerDesc}`),
    );
  });

  /** 收集完路由后装载路由 */
  app.$router?.buildRoutes();

  compose(io.moduleStyle, io.log)('Router initd');
}

export const createControllerInstance = (app: tenonAppType, Ctor: { new(...args: any[]): BaseController }) => {
  const instance = new Ctor(app);
  app.$controllers![instance.ControllerName] = instance;
  io.log(`- ${instance.ControllerName}`);
}

export class BaseController implements IDecoratedControllerExtraFields {
  public app: tenonAppType;
  /** Get/Post 类的请求装饰器会给Controller的原型上添加handlers属性 */
  protected handlers!: ((instance: BaseController) => void)[];
  /** Controller装饰器会为子类实例加上该属性 */
  public ControllerName!: string;
  /** Controller装饰器会为子类实例加上该属性 */
  // public prefixPath!: string;
  /** Controller装饰器会为子类加上该属性 */
  public static prefixPath: string;
  public subController?: IDecoratedController[];

  constructor(app: tenonAppType) {
    this.app = app;
  }

  getSpecifiedFieldParams<P extends any, T extends keyof P>(params: P, fields: T[]): Record<T, any> {
    const result: Record<T, unknown> = {} as Record<T, any>;
    fields.forEach((fieldKey) => {
      if (params[fieldKey]) result[fieldKey] = params[fieldKey];
    });
    return result;
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