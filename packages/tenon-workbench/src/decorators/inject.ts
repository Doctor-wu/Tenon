import { Inject as _inject } from "@tenon/shared";
import { SyncFeatureTag } from "../services";

type WorkbenchInject = (name: SyncFeatureTag) => any;

/**
 * Inject 只允许注入同步依赖
 */
export const Inject: WorkbenchInject = (name: SyncFeatureTag) => {
  return (target, propertyKey, paramIndex) => {
    _inject(name)(target, propertyKey, paramIndex);
  }
}
