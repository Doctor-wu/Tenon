import {
  Feature, Inject
} from "@tenon/workbench";
import { IEditModeFeature, ModeType } from "./edit-mode.interface";
import { IContext, TenonEditorContext } from "@/core/context";
import { ModeNotification } from "./notification";

@Feature({
  name: IEditModeFeature,
})
export class EditModeHandler implements IEditModeFeature {
  public mode: ModeType = ModeType.Edit;
  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    this.context.on(
      ModeType.Edit,
      (noti: ModeNotification) => console.log(noti),
    );
    this.context.on(
      ModeType.Preview,
      (noti: ModeNotification) => console.log(noti),
    );
  }

  switchMode(mode: ModeType): void {
    this.mode = mode;
    this.context.fire(new ModeNotification(mode));
  }
}
