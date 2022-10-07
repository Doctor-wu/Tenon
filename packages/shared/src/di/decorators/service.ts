import { DIState } from '../core';
import { InjectTag } from './inject';

export const ServiceTag = Symbol('Service');

export const createServiceDecorator = (state: DIState, tagName: any = ServiceTag) => ({
  name,
}) => {
  return (target) => {
    state.services.set(name, {
      name,
      loader: () => target,
    });
    target.prototype[tagName] = {
      deps: new Map<number, string>(target.prototype[InjectTag] || undefined),
      name,
    };
  }
}