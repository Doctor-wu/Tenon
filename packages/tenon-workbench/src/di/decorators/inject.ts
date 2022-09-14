import { Inject as _inject } from "@tenon/shared";
import { SyncFeatureTag } from "../../core";

export const Inject: (name: SyncFeatureTag) => ParameterDecorator = (name: SyncFeatureTag) => {
  return (target, propertyKey, paramIndex) => {
    _inject(name)(target, propertyKey, paramIndex);
  }
}