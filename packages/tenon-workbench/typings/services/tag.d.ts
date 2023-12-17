export type DynamicFeatureTag = symbol;
export type SyncFeatureTag = symbol;
export type ServiceTag = symbol;
export declare const createDynamicFeatureTag: (tagName: string) => DynamicFeatureTag;
export declare const createSyncFeatureTag: (tagName: string) => SyncFeatureTag;
export declare const createServiceTag: (tagName: string) => ServiceTag;
