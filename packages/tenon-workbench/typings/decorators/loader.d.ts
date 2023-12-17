import { FeatureTag } from "./feature";
export declare const LoaderTag: unique symbol;
export type IDynamicFeature<T> = {
    getInstance: () => Promise<T>;
    instance?: T;
};
/**
 * loader 既支持同步依赖也支持异步依赖
 */
export declare const Loader: (tag: FeatureTag) => PropertyDecorator;
