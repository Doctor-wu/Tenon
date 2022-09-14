import { workbenchDIState } from "../../core/di-state";
import { FeatureTag } from "./feature";

export const LoaderTag = Symbol('Loader');
export type IDynamicFeature<T> = {
  getInstance: () => Promise<T>;
  instance?: T;
}

export const Loader: (tag: FeatureTag) => PropertyDecorator = (tag: FeatureTag) => {
  return (target, propertyKey) => {
    let instance;
    target[propertyKey] = {
      getInstance: async () => {
        if (instance) return instance;
        instance = await workbenchDIState.get(tag);
        target[propertyKey].instance = instance;
        return instance;
      }
    }
  }
}