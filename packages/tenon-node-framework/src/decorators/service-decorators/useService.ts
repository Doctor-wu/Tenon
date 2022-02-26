import { BaseService } from "../../service";
import { serviceRegistry } from "../../service/registry";

export function useService(serviceName: string) {
  return function useServiceDecorator(target: BaseService, propertyKey: string | symbol) {
    Reflect.defineProperty(target, propertyKey, {
      get() {
        return serviceRegistry.get(serviceName);
      }
    });

  } as PropertyDecorator;
}