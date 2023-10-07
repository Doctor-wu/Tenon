import { DynamicFeatureTag, SyncFeatureTag } from "../services/tag";
export interface IDynamicLoader<T extends unknown> {
    load: () => Promise<T>;
}
export declare const dynamicLoaderRegistry: Map<symbol, IDynamicLoader<unknown>>;
export declare const bindDynamicLoader: <T extends unknown>(tag: DynamicFeatureTag, loader: IDynamicLoader<T>) => void;
export declare const bindSyncFeature: (tag: SyncFeatureTag, feature: any) => void;
