import { Feature, Inject } from "@tenon/workbench";
import { IEditModeFeature } from "./edit-mode.interface";
import { EditModeChange, ModeNotification, ModeType } from "./notification";
import { Ref } from "vue";
import { EditorMode } from "./reactive";
import { IContext, TenonEditorContext } from "@/core";

@Feature({
  name: IEditModeFeature,
})
export class EditModeHandler implements IEditModeFeature {
  public mode: Ref<ModeType> = EditorMode;
  constructor(@Inject(IContext) private context: TenonEditorContext) {
    this.context.on(EditModeChange, (noti: ModeNotification) =>
      console.log(noti)
    );
  }

  switchMode(mode: ModeType): void {
    this.context.fire(new ModeNotification(mode, this.mode.value));
    this.mode.value = mode;
  }
}
