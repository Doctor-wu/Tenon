import { EditorRenderType } from "@/features/editor-render-type";

export enum StoreKey {
  EditorRenderType = 'editorRenderType',
}

export interface IStoreState {
  [StoreKey.EditorRenderType]: EditorRenderType,
}

export const initialState: IStoreState = {
  editorRenderType: EditorRenderType.React,
};
