import { ActionInfoService } from "./action-info-service";
import { BarService } from "./bar-service";
import { ContextService } from "./context";
import { WorkbenchDIService, WorkbenchDIServiceCore } from "./di-service";
import { DrawerService } from "./drawer-service";
import { EventEmitterService } from "./event-emitter";
import { SurfaceService } from "./surface-service";
import { createServiceTag, ServiceTag } from "./tag";

export const ServiceDecoratorTag = createServiceTag('servicePropertyDecorator');

const createServiceInjector = (serviceTag: ServiceTag) => {
  return () => {
    return (target, propertyKey, propertyIndex) => {
      const deps = target[ServiceDecoratorTag] || (target[ServiceDecoratorTag] = new Map);
      const propertyDeps = deps.get(propertyKey) || (deps.set(propertyKey, new Map), deps.get(propertyKey));
      propertyDeps.set(propertyIndex, serviceTag);
    };
  };
};

export const ProvideServiceTag = createServiceTag('ProvideService');

/**
 * 使用 @Inject__Service时需要使用这个装饰器装饰方法
 */
export const ProvideService: MethodDecorator = function (target, propertyKey, desc) {
  // 确保只会Provide一次
  if (target[ProvideServiceTag] && target[ProvideServiceTag].has(propertyKey)) return;
  target[ProvideServiceTag] = target[ProvideServiceTag] || new Set();
  target[ProvideServiceTag].add(propertyKey);
  const oldValue = desc.value! as unknown as Function;
  desc.value = async function (this: any, ...args: any[]) {
    const applyArgs: any[] = [];
    const propertyDeps = target[ServiceDecoratorTag].get(propertyKey);
    let injectArgsCount = propertyDeps?.size || 0;
    let argIndex = 0;
    const factory = new WorkbenchDIServiceCore();
    while (args.length || injectArgsCount > 0) {
      if (propertyDeps.has(argIndex)) {
        const serviceInstance = factory.getServiceInstance(propertyDeps.get(argIndex));
        applyArgs.push(serviceInstance);
        injectArgsCount -= 1;
      } else {
        applyArgs.push(
          args.pop()
        )
      }
      argIndex += 1;
    }
    return await oldValue.call(this, ...applyArgs);
  } as any;
};

/**
 * 需要与 @ProvideService 搭配使用
 */
export const InjectBarService = createServiceInjector(BarService);

/**
 * 需要与 @ProvideService 搭配使用
 */
export const InjectContextService = createServiceInjector(ContextService);

/**
 * 需要与 @ProvideService 搭配使用
 */
export const InjectEventEmitterService = createServiceInjector(EventEmitterService);

/**
 * 需要与 @ProvideService 搭配使用
 */
export const InjectDIService = createServiceInjector(WorkbenchDIService);

/**
 * 需要与 @ProvideService 搭配使用
 */
export const InjectActionInfoService = createServiceInjector(ActionInfoService);

/**
 * 需要与 @ProvideService 搭配使用
 */
export const InjectSurfaceService = createServiceInjector(SurfaceService);

/**
* 需要与 @ProvideService 搭配使用
*/
export const InjectDrawerService = createServiceInjector(DrawerService);
