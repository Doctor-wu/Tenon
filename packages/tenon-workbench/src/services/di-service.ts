import { DIState, Singleton } from "@tenon/shared";
import { dynamicLoaderRegistry } from "../core/loader";
import { createServiceTag } from "./tag";

export const WorkbenchDIService = createServiceTag('WorkbenchDIService');

// @SingletonDecorator

@Singleton
/**
 * 仅限内部实例化使用
 */
export class WorkbenchDIServiceCore extends DIState {
  // 该方法拓展了基础di的get，既可以获取同步依赖的feature也可以获取异步依赖的feature
  async get<T>(serviceName: any, ...args: any[]): Promise<T | undefined> {
    let instance: T | undefined;
    if (instance = this.getServiceInstance(serviceName, ...args)) return instance;
    if (dynamicLoaderRegistry.has(serviceName)) {
      const instance = await dynamicLoaderRegistry.get(serviceName)?.load();
      this.regisService(serviceName, () => instance);
      return this.initService(this.services.get(serviceName)!, ...args);
    } else {
      console.warn(`${serviceName} has not been injected`);
    }
  }
};
