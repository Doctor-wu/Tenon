export type DynamicFeatureTag = symbol;
export type SyncFeatureTag = symbol;

export const createDynamicFeatureTag: (tagName: string) => DynamicFeatureTag = (tagName: string) => Symbol.for(tagName);
export const createSyncFeatureTag: (tagName: string) => SyncFeatureTag = (tagName: string) => Symbol.for(tagName);