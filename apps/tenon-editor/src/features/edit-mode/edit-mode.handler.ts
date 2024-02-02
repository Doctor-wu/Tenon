import { Feature, IDynamicFeature, Inject, Loader, awaitLoad } from "@tenon/workbench";
import { IEditModeFeature, EditModeType } from "./edit-mode.interface";
import { EditModeChange, ModeNotification } from "./notification";
import { Ref } from "vue";
import { IContext, TenonEditorContext, getStoreValue } from "@/core";
import { IAreaIndicatorFeature } from "../area-indicator";
import { Logger } from "@/utils/logger";
import { StoreKey, setStoreValue } from "@/store";

@Feature({
  name: IEditModeFeature,
})
export class EditModeHandler implements IEditModeFeature {
  public mode = getStoreValue(StoreKey.EditMode).value;

  @Loader(IAreaIndicatorFeature)
  private areaIndicator: IDynamicFeature<IAreaIndicatorFeature>;

  get [IAreaIndicatorFeature](): IAreaIndicatorFeature {
    return this.areaIndicator.instance!;
  }

  constructor(@Inject(IContext) private context: TenonEditorContext) {
    this.context.on(EditModeChange, (noti: ModeNotification) => {
      Logger.log(noti);
      if (noti.mode === EditModeType.Edit) {
        this.changeAreaIndicatorVisible(true);
      } else if (noti.mode === EditModeType.Preview) {
        this.changeAreaIndicatorVisible(false);
      }
      setStoreValue(StoreKey.EditMode, noti.mode);
    });
  }

  switchMode(mode: EditModeType): void {
    this.context.fire(new ModeNotification(mode, this.mode));
    this.mode = mode;
  }

  @awaitLoad(IAreaIndicatorFeature)
  private changeAreaIndicatorVisible(visible: boolean) {
    this.areaIndicator.instance!.changeVisible(visible);
  }
}
