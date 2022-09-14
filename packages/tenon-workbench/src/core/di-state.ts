import { DIState } from "@tenon/shared";
import { dynamicLoaderRegistry } from "./loader";

export class WorkbenchDIState extends DIState {
  // 该方法拓展了基础di的get，既可以获取同步依赖的feature也可以获取异步依赖的feature
  async get<T>(serviceName: any, ...args: any[]): Promise<T | undefined> {
    let instance: T | undefined;
    if (instance = this.getServiceInstance(serviceName)) return instance;
    if (dynamicLoaderRegistry.has(serviceName)) {
      const instance = await dynamicLoaderRegistry.get(serviceName)?.load();
      this.regisService(serviceName, () => instance);
      return this.initService(this.services.get(serviceName)!, ...args);
    }
  }
};

export const workbenchDIState = new WorkbenchDIState();