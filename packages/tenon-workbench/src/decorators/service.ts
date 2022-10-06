import { WorkbenchDIServiceCore } from '../services/di-service';
import { createServiceDecorator } from "@tenon/shared";
import { ServiceTag } from '../services';


export const ServiceHandler = createServiceDecorator(
  new WorkbenchDIServiceCore(),
);

export interface IServiceParams {
  name: ServiceTag;
}

export const ServiceNameKey = Symbol('ServiceNameKey');

export const Service: (params: IServiceParams) => ClassDecorator = (params: IServiceParams) => (target) => {
  const {
    name,
  } = params;
  target[ServiceNameKey] = name;

  ServiceHandler({name})(target);
};