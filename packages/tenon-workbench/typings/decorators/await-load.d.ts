import { FeatureTag } from './feature';
type awaitLoadType = (...tags: FeatureTag[]) => MethodDecorator;
export declare const awaitLoad: awaitLoadType;
export {};
