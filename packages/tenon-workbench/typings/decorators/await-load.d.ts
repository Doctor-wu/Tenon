import { FeatureTag } from './feature';
declare type awaitLoadType = (...tags: FeatureTag[]) => MethodDecorator;
export declare const awaitLoad: awaitLoadType;
export {};
