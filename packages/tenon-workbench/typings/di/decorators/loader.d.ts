import { FeatureTag } from "./feature";
export declare const LoaderTag: unique symbol;
export declare type IDynamicFeature<T> = {
    getInstance: () => Promise<T>;
    instance?: T;
};
export declare const Loader: (tag: FeatureTag) => PropertyDecorator;
