import { BaseController } from "../../controller";
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
  return function controllerDecorator<T extends { new(...args: any[]): BaseController }>(
    Ctor: T
  ): T & IDecoratedController {
    return class extends Ctor {
      constructor(...args: any[]) {
        super(args);

        this.prefixPath = prefixPath;
        this.ControllerName = name || Ctor.name;
        controllerRegistry.set(this.ControllerName, this);
        this.handlers.forEach(handler => handler(this));
      }
    };
  } as ClassDecorator;
}