import { BaseService } from "../../service";
import { serviceRegistry } from "../../service/registry";
import { IDecoratedService, IServiceConfig } from "./Service.interface";

export function Service(config: IServiceConfig) {
  const { schema,name } = config;
  return function serviceDecorator<T extends { new(...args: any[]): BaseService }>(
    Ctor: T
  ): T & IDecoratedService {
    // 返回一个新的类，继承自所装饰的Service
    return class extends Ctor {

      constructor(...args: any) {
        super(...args);
        this.serviceName = name || Ctor.name;
        this.schemaInstance = schema;
        this.buildModel();
        serviceRegistry.set(this.serviceName, this);
      }
    }
  } as ClassDecorator;
}