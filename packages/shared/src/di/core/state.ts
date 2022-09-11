import { IService } from "../types/service.interface";
import { newable } from "@tenon/shared";
import { ServiceTag } from "../decorators";

export class DIState {
  static services = new Map<string, IService<any>>();
  static instance?: DIState;

  static getInstance = () => {
    if (!this.instance) this.instance = new DIState;
    return this.instance;
  }

  static getDeps(service: IService, ...args: unknown[]): any {
    const deps: any[] = [];
    const target = service.loader();
    const depsMap = target[ServiceTag];
    const argsLen = target.length;
    let otherArgsIndex = 0;
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
    return deps;
  }

  static initService<T extends newable<unknown[], T>>(service: IService<T>, ...args: unknown[]): T {
    const deps = DIState.getDeps(service as unknown as IService, ...args);
    const {
      loader,
      onLoad,
    } = service;
    const Type = loader();
    service.instance = new Type(...deps);
    if (onLoad) {
      onLoad(service);
    }
    this.services.set(service.name, service);
    return service.instance;
  }

  static getServiceInstance(serviceName: string) {
    const service = this.services.get(serviceName);
    if (!service) {
      console.warn('service is not injected');
    } else {
      if (service.instance) return service.instance;
      this.mount(serviceName);
      return service.instance;
    }
  }

  static mount(serviceName: string, ...args: unknown[]){
    if (!this.services.has(serviceName)) {
      console.warn('service is not injected');
    } else {
      const service = this.services.get(serviceName)!;
      // initd
      if (service.instance) return;
      this.initService(service, ...args);
    }
  }

}