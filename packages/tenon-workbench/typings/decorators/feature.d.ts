import { DynamicFeatureTag, SyncFeatureTag } from "../services";
export interface IFeatureParams {
    name: FeatureTag;
}
export type FeatureTag = DynamicFeatureTag | SyncFeatureTag;
export declare const FeatureNameKey: unique symbol;
export declare const Feature: (params: IFeatureParams) => ClassDecorator;
