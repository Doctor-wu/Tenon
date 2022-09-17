import { DynamicFeatureTag, SyncFeatureTag } from "../core";
export interface IFeatureParams {
    name: FeatureTag;
}
export declare type FeatureTag = DynamicFeatureTag | SyncFeatureTag;
export declare const FeatureNameKey: unique symbol;
export declare const Feature: (params: IFeatureParams) => ClassDecorator;
