import { AreaIndicatorHandler } from './area-indicator';
import { ComponentsTreeController, IComponentsTreeFeature } from './components-tree';
import { EditModeController, IEditModeFeature } from './edit-mode';
import { FullScreenController, IFullScreenFeature } from './fullscreen';
import { IMaterialFeature, MaterialController } from './material';
import { TitleController, TitleHandler } from "./title";

export const syncFeatures = [
  TitleHandler,
  AreaIndicatorHandler,
];

export const dynamicTags = [
  IFullScreenFeature,
  IEditModeFeature,
  IMaterialFeature,
  IComponentsTreeFeature,
]

export const controllers = [
  TitleController,
  FullScreenController,
  EditModeController,
  MaterialController,
  ComponentsTreeController,
];
