import { createServiceDecorator } from "@tenon/shared";
import { DynamicFeatureTag, SyncFeatureTag } from "../../core";
import { workbenchDIState } from "../../core/di-state";

export interface IFeatureParams {
  name: FeatureTag;
}

export type FeatureTag = DynamicFeatureTag | SyncFeatureTag;

export const FeatureNameKey = Symbol('FeatureNameKey');

const Service = createServiceDecorator(workbenchDIState);

export const Feature: (params: IFeatureParams) => ClassDecorator = (params: IFeatureParams) => (target) => {
  const {
    name,
  } = params;
  target[FeatureNameKey] = name;

  Service({name})(target);
};