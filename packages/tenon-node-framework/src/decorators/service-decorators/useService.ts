import { BaseService } from "../../service";
import { serviceRegistry } from "../../service/registry";

export function useService(serviceName: string) {
  return function useServiceDecorator(target: BaseService, propertyKey: string | symbol) {
    setTimeout(() => {
      Reflect.defineProperty(target, propertyKey, {
        get() {
          return serviceRegistry.get(serviceName);
        }
      });
    }, 4);
  } as PropertyDecorator;
}