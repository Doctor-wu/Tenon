import { FullScreenController, IFullScreenFeature } from './fullscreen';
import { TitleController, TitleHandler } from "./title";

export const syncFeatures = [
  TitleHandler,
];

export const dynamicTags = [
  IFullScreenFeature,
]

export const controllers = [
  TitleController,
  FullScreenController
];
