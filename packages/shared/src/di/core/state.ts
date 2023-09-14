import { IService } from "../types/service.interface";
import { newable } from "@tenon/shared";
import { ServiceTag } from "../decorators";

export class DIState {
  services = new Map<any, IService<any>>();
  instances = new Map<any, any>();
  depsStack: string[] = [];

  protected getDeps(service: IService, ...args: any[]): any {
    if (this.depsStack.includes(service.name)) {
      this.depsStack.push(service.name);
      throw new Error(`[Circle Deps] ${this.depsStack.map(String).join(' -> ')}`);
    }
    this.depsStack.push(service.name);
    const deps: any[] = [];
    const target = service.loader();
    const depsMap = target.prototype[ServiceTag].deps;
    const argsLen = target.length;
    for (let i = 0; i < argsLen; i++) {
      if (depsMap.has(i)) {
        deps[i] = this.getServiceInstance(depsMap.get(i));
      } else {
        if (args.length) {
          deps[i] = args.shift();
        } else {
          deps[i] = undefined;
        }
      }
    };
    this.depsStack.pop();
    return [...deps, ...args];
  }

  protected initService<T extends newable<any[], T>>(service: IService<T>, ...args: any[]): T {
    const deps = this.getDeps(service as unknown as IService, ...args);
    const {
      loader,
      onLoad,
    } = service;
    const Type = loader();
    service.instance = new Type(...deps);
    if (onLoad) {
      onLoad(service.instance!);
    }
    this.services.set(service.name, service);
    this.instances.set(service.name, service.instance!);
    this.depsStack.length = 0;
    return service.instance;
  }

  public getServiceInstance<T>(serviceName: any, ...args: any[]): T | undefined {
    const service = this.services.get(serviceName);
    if (!service) {
      // console.warn(`service ${serviceName.toString()} is not injected`);
    } else {
      if (service.instance) return service.instance;
      this.mount(serviceName, ...args);
      return service.instance;
    }
  }

  public mount(serviceName: any, ...args: unknown[]) {
    if (!this.services.has(serviceName)) {
      console.warn('service is not injected');
    } else {
      const service = this.services.get(serviceName)!;
      // initd
      if (service.instance) return;
      this.initService(service, ...args);
    }
  }

  public regisService<T extends unknown>(serviceName: any, loader: () => T, onLoad?: (instance: T) => void) {
    this.services.set(serviceName, {
      name: serviceName,
      loader,
      onLoad,
    });
  }
}
