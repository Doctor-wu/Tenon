import { WorkbenchDIServiceCore } from '../core';
import { FeatureTag } from "./feature";

export const LoaderTag = Symbol('Loader');

export type IDynamicFeature<T> = {
  getInstance: () => Promise<T>;
  instance?: T;
}

/**
 * loader 既支持同步依赖也支持异步依赖
 */
export const Loader: (tag: FeatureTag) => PropertyDecorator = (tag: FeatureTag) => {
  return (target, propertyKey) => {
    let instance;
    target[LoaderTag] = target[LoaderTag] || {};
    target[propertyKey] = {
      getInstance: async () => {
        if (instance) return instance;
        instance = await new WorkbenchDIServiceCore().get(tag);
        target[propertyKey].instance = instance;
        return instance;
      }
    }
    target[LoaderTag][tag] = target[propertyKey];
  }
}