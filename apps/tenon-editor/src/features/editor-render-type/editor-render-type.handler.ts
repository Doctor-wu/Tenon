import {
  Feature
} from "@tenon/workbench";
import { IEditorRenderTypeFeature } from "./editor-render-type.interface";

@Feature({
  name: IEditorRenderTypeFeature,
})
export class EditorRenderTypeHandler implements IEditorRenderTypeFeature {
}
