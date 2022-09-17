import { SyncFeatureTag } from "../core";
declare type WorkbenchInject = (name: SyncFeatureTag) => ParameterDecorator;
/**
 * Inject 只允许注入同步依赖
 */
export declare const Inject: WorkbenchInject;
export {};
