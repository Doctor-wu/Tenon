import { DynamicFeatureTag, SyncFeatureTag } from "../services";
import { ServiceHandler } from "./service";

export interface IFeatureParams {
  name: FeatureTag;
}

export type FeatureTag = DynamicFeatureTag | SyncFeatureTag;

export const FeatureNameKey = Symbol('FeatureNameKey');

export const Feature: (params: IFeatureParams) => ClassDecorator = (params: IFeatureParams) => (target) => {
  const {
    name,
  } = params;
  target.prototype[FeatureNameKey] = name;

  ServiceHandler({name})(target);
};