import { BaseController } from "../../controller";
import { TypeMiddleware } from "../../controller/controller-core.interface";
import { getControllerStore } from "../../controller/registry";


export function MiddleWare(cb: TypeMiddleware) {
  return function decorator(target, propertyKey, descriptor) {
    target.handlers = target.handlers || [];
    target.handlers.push((instance: BaseController) => {
      const store = getControllerStore(instance.ControllerName);
      if (!store.middleware) store.middleware = {};
      if (!store.middleware[propertyKey]) store.middleware[propertyKey] = [];
      store.middleware[propertyKey].push(cb);
    });
  }
}