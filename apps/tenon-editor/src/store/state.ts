import { EditModeType } from "@/features/edit-mode/edit-mode.interface";
import { EditorRenderType } from "@/features/editor-render-type/editor-render-type.interface";

export enum StoreKey {
  EditMode = 'editMode',
  EditorRenderType = 'editorRenderType',
  CanUndo = 'canUndo',
  CanRedo = 'canRedo',
}

export interface IStoreState {
  [StoreKey.EditMode]: EditModeType,
  [StoreKey.EditorRenderType]: EditorRenderType,
  [StoreKey.CanUndo]: boolean,
  [StoreKey.CanRedo]: boolean,
}

export const initialState: IStoreState = {
  [StoreKey.EditMode]: EditModeType.Edit,
  [StoreKey.EditorRenderType]: EditorRenderType.Vue,
  [StoreKey.CanUndo]: false,
  [StoreKey.CanRedo]: false,
};
