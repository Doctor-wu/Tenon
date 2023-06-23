import { AreaIndicatorHandler } from './area-indicator';
import { ComponentsTreeController, IComponentsTreeFeature } from './components-tree';
import { ComposeViewController, IComposeViewFeature } from './compose-view';
import { EditModeController, IEditModeFeature } from './edit-mode';
import { FullScreenController, IFullScreenFeature } from './fullscreen';
import { IMaterialFeature, MaterialController } from './material';
import { IMaterialDragFeature, MaterialDragController } from './material-drag';
import { IRuntimeComponentTreeFeature, RuntimeComponentTreeController } from './runtime-component-tree';
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
  IMaterialDragFeature,
  IComposeViewFeature,
  IRuntimeComponentTreeFeature,
]

export const controllers = [
  TitleController,
  FullScreenController,
  EditModeController,
  MaterialController,
  ComponentsTreeController,
  MaterialDragController,
  ComposeViewController,
  RuntimeComponentTreeController,
];
