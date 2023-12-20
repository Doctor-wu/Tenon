import { AreaIndicatorHandler } from './area-indicator';
import { ComponentsTreeController, IComponentsTreeFeature } from './components-tree';
import { ComposeViewController, IComposeViewFeature } from './compose-view';
import { EditModeController, IEditModeFeature } from './edit-mode';
import { EditorRenderTypeController } from './editor-render-type';
import { FullScreenController, IFullScreenFeature } from './fullscreen';
import { GithubHrefController, IGithubHrefFeature } from './github-href';
import { IMaterialFeature, MaterialController } from './material';
import { IMaterialDragFeature, MaterialDragController } from './material-drag';
import { IPwaFeature, PwaController } from './pwa';
import { IRuntimeComponentTreeFeature, RuntimeComponentTreeController } from './runtime-component-tree';
import { TitleController, TitleHandler } from "./title";
import { IUndoRedoFeature, UndoRedoController } from './undo-redo';

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
  IUndoRedoFeature,
  IGithubHrefFeature,
  IPwaFeature,
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
  UndoRedoController,
  EditorRenderTypeController,
  GithubHrefController,
  PwaController,
];
