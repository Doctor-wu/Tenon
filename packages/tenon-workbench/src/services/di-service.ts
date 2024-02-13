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

  private pendingMap = new Map<any, Promise<unknown>>()
  // 该方法拓展了基础di的get，既可以获取同步依赖的feature也可以获取异步依赖的feature
  async get<T>(serviceName: any, ...args: any[]): Promise<T | undefined> {
    let instance: T | undefined;
    if (instance = this.getServiceInstance(serviceName, ...args)) return instance;
    if (dynamicLoaderRegistry.has(serviceName)) {
      let p: Promise<unknown>;
      if (!this.pendingMap.has(serviceName)) {
        p = dynamicLoaderRegistry.get(serviceName)!.load();
        this.pendingMap.set(serviceName, p);
        const instance = await p;
        this.regisService(serviceName, () => instance);
        this.pendingMap.delete(serviceName);
        return this.initService(this.services.get(serviceName)!, ...args);
      } else {
        p = this.pendingMap.get(serviceName)!;
        await p;
        this.pendingMap.delete(serviceName);
        return this.getServiceInstance(serviceName, ...args);
      }
    } else {
      console.warn(`${serviceName} has not been injected`);
    }
  }
};
