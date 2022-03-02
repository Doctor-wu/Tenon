import { BaseController, createControllerInstance } from "../../controller";
import { IControllerConfig, IDecoratedController } from "./Controller.interface";
import { getControllerStore } from "../../controller/registry";

/**
 * Controller的装饰器，所有Controller都会被收集起来同时被实例化
 * @param config IControllerConfig
 */
export function Controller(config: IControllerConfig) {
  const {
    prefixPath,
    name,
    middleware,
  } = config;
  return function controllerDecorator<T extends { new(...args: any[]): BaseController, prefixPath: string }>(
    Ctor: T
  ): T & IDecoratedController {
    (Ctor as any).prototype.ControllerName = name || Ctor.name;

    class DecoratedController extends Ctor {
      static prefixPath: string = prefixPath;
      ControllerName: string = name || Ctor.name;
      constructor(...args: any[]) {
        super(...args);

        this.ControllerName = name || Ctor.name;
        const handlers = this.handlers;
        if (middleware) {
          this.middleware.push(...middleware);
        }
        if (handlers) handlers.forEach(handler => handler(this));
        if (this.subController) {
          this.subController.forEach(Sub => {
            Sub.prefixPath = DecoratedController.prefixPath + Sub.prefixPath;
            createControllerInstance(this.app, Sub);
          });
        }
      }
    };
    return DecoratedController;
  } as ClassDecorator;
}