import { WorkbenchDIServiceCore } from '../core/di-state';
import { createServiceDecorator } from "@tenon/shared";
import { ServiceTag } from '../core';


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