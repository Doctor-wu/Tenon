import { DIState } from '../core';
import { InjectTag } from './inject';
type ServiceType = (params: {
  name: string;
}) => ClassDecorator;

export const ServiceTag = Symbol('Service');

export const Service: ServiceType = ({
  name,
}) => {
  return (target) => {
    DIState.services.set(name, {
      name,
      loader: () => target,
    });
    target[ServiceTag] = {
      deps: new Map<number, string>(target[InjectTag] || undefined),
      name,
    };
  }
}