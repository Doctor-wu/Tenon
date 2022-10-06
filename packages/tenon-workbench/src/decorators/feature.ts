import { DynamicFeatureTag, SyncFeatureTag, WorkbenchDIService, WorkbenchDIServiceCore } from "../core";
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
  target[FeatureNameKey] = name;

  ServiceHandler({name})(target);
};