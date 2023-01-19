import {
  ActionController, ActionInfo,
  ActionType, BarServiceCore,
  Controller, IDynamicFeature,
  InjectActionInfoService, InjectBarService,
  Loader, awaitLoad,
} from "@tenon/workbench";
import { IEditModeFeature, ModeType } from "./edit-mode.interface";
import { ToolBarName } from "@/configs/tool-bar-config";
import { editModeConfig, previewModeConfig } from "./config";
import { MessagePlugin } from "tdesign-vue-next";

@Controller({
  name: Symbol('edit-mode-controller')
})
export class EditModeController {

  @Loader(IEditModeFeature)
  editModeLoader: IDynamicFeature<IEditModeFeature>;

  get editModeFeature() {
    return this.editModeLoader.instance;
  }

  @ActionController(ToolBarName.PreviewMode, ActionType.onClick)
  @ActionController(ToolBarName.EditMode, ActionType.onClick)
  @awaitLoad(IEditModeFeature)
  handleModeSwitch(
    @InjectBarService() barService: BarServiceCore,
    @InjectActionInfoService() actionInfo: ActionInfo<ModeType>,
  ) {
    switch (actionInfo.name) {
      case ModeType.Preview:
        barService.updateToolBarConfig(
          ToolBarName.Mode,
          previewModeConfig,
        );
        break;
      case ModeType.Edit:
        barService.updateToolBarConfig(
          ToolBarName.Mode,
          editModeConfig,
        );
        break;
    }
    this.editModeFeature!.switchMode(actionInfo.name);
    MessagePlugin.success(
      `切换为：${actionInfo.name === ModeType.Preview ? previewModeConfig.text : editModeConfig.text}`
    );
  }

}
