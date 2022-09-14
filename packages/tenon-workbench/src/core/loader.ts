import { FeatureTag } from "../di/decorators"

export interface IDynamicLoader<T extends unknown> {
  load: () => Promise<T>,
}

export const dynamicLoaderRegistry = new Map<FeatureTag, IDynamicLoader<unknown>>();

export const bindDynamicLoader = <T extends unknown>(tag: FeatureTag, loader: IDynamicLoader<T>) => {
  if (dynamicLoaderRegistry.has(tag)) {
    console.error(`${tag} has been bind`);
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