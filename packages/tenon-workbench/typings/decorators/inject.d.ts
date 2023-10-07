import { SyncFeatureTag } from "../services";
declare type WorkbenchInject = (name: SyncFeatureTag) => any;
/**
 * Inject 只允许注入同步依赖
 */
export declare const Inject: WorkbenchInject;
export {};
