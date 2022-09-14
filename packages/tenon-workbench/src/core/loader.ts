import { DynamicFeatureTag, SyncFeatureTag } from "./tag";

export interface IDynamicLoader<T extends unknown> {
  load: () => Promise<T>,
}

export const dynamicLoaderRegistry = new Map<DynamicFeatureTag, IDynamicLoader<unknown>>();

export const bindDynamicLoader = <T extends unknown>(tag: DynamicFeatureTag, loader: IDynamicLoader<T>) => {
  if (dynamicLoaderRegistry.has(tag)) {
    console.error(`${tag.description} has been bind`);
    return;
  }
  let instance;
  const originLoad = loader.load;
  const internalLoader = async () => {
    if (instance) return instance;
    instance = await originLoad();
    return instance;
  }
  loader.load = internalLoader;
  dynamicLoaderRegistry.set(tag, loader);
}

export const bindSyncFeature = (tag: SyncFeatureTag, feature: any) => {
  feature[tag] = 'sync';
}