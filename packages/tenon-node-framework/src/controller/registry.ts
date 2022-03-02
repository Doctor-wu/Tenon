import { BaseController } from "./controller-core";
import { TypeMiddleware } from "./controller-core.interface";

export const controllerRegistry = new Map<string, ControllerStore>();

type ControllerStore = {
  middleware?: Record<string, TypeMiddleware[]>;
  instance?: BaseController;
  handlers?: ((instance: BaseController) => void)[];
}

export const getControllerStore = (name: string) => {
  let store = controllerRegistry.get(name);
  if (!store) controllerRegistry.set(name, (store = {}));
  return store;
}