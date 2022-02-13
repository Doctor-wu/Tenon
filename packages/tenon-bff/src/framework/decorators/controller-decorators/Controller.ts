import { BaseController, createControllerInstance } from "../../controller";
import { IControllerConfig, IDecoratedController } from "./Controller.interface";
import { controllerRegistry } from "../../controller/registry";

/**
 * Controller的装饰器，所有Controller都会被收集起来同时被实例化
 * @param config IControllerConfig
 */
export function Controller(config: IControllerConfig) {
  const {
    prefixPath,
    name,
  } = config;
  return function controllerDecorator<T extends { new(...args: any[]): BaseController, prefixPath: string }>(
    Ctor: T
  ): T & IDecoratedController {
    return class DecoratedController extends Ctor {
      static prefixPath: string = prefixPath;
      constructor(...args: any[]) {
        super(...args);

        this.prefixPath = DecoratedController.prefixPath; // 不能简单的用传入的prefixPath，因为这个值可以被父级修改
        this.ControllerName = name || Ctor.name;
        controllerRegistry.set(this.ControllerName, this);
        if (this.handlers) this.handlers.forEach(handler => handler(this));
        if (this.subController) {
          this.subController.forEach(Sub => {
            Sub.prefixPath = this.prefixPath + Sub.prefixPath;
            createControllerInstance(this.app, Sub);
          });
        }
      }
    };
  } as ClassDecorator;
}