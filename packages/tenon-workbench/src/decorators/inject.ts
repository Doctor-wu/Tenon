import { Inject as _inject } from "@tenon/shared";
import { SyncFeatureTag } from "../core";

type WorkbenchInject = (name: SyncFeatureTag) => ParameterDecorator;

/**
 * Inject 只允许注入同步依赖
 */
export const Inject: WorkbenchInject = (name: SyncFeatureTag) => {
  return (target, propertyKey, paramIndex) => {
    _inject(name)(target, propertyKey, paramIndex);
  }
}