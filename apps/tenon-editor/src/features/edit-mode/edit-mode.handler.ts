import { Feature, IDynamicFeature, Inject, Loader, awaitLoad } from "@tenon/workbench";
import { IEditModeFeature } from "./edit-mode.interface";
import { EditModeChange, ModeNotification, ModeType } from "./notification";
import { Ref } from "vue";
import { EditorMode } from "./reactive";
import { IContext, TenonEditorContext } from "@/core";
import { IAreaIndicatorFeature } from "../area-indicator";
import { Logger } from "@/utils/logger";

@Feature({
  name: IEditModeFeature,
})
export class EditModeHandler implements IEditModeFeature {
  public mode: Ref<ModeType> = EditorMode;

  @Loader(IAreaIndicatorFeature)
  private areaIndicator: IDynamicFeature<IAreaIndicatorFeature>;

  get [IAreaIndicatorFeature](): IAreaIndicatorFeature {
    return this.areaIndicator.instance!;
  }

  constructor(@Inject(IContext) private context: TenonEditorContext) {
    this.context.on(EditModeChange, (noti: ModeNotification) => {
      Logger.log(noti);
      if (noti.mode === ModeType.Edit) {
        this.changeAreaIndicatorVisible(true);
      } else if (noti.mode === ModeType.Preview) {
        this.changeAreaIndicatorVisible(false);
      }
    });
  }

  switchMode(mode: ModeType): void {
    this.context.fire(new ModeNotification(mode, this.mode.value));
    this.mode.value = mode;
  }

  @awaitLoad(IAreaIndicatorFeature)
  private changeAreaIndicatorVisible(visible: boolean) {
    this.areaIndicator.instance!.changeVisible(visible);
  }
}
