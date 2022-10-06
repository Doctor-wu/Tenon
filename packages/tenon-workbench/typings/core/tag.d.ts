export declare type DynamicFeatureTag = symbol;
export declare type SyncFeatureTag = symbol;
export declare type ServiceTag = symbol;
export declare const createDynamicFeatureTag: (tagName: string) => DynamicFeatureTag;
export declare const createSyncFeatureTag: (tagName: string) => SyncFeatureTag;
export declare const createServiceTag: (tagName: string) => ServiceTag;
