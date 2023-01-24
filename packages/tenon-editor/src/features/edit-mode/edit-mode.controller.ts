import {
  ActionController, ActionInfo,
  ActionType, BarService, BarServiceCore,
  Controller, IDynamicFeature,
  IToolBarSwitchConfig,
  Inject,
  InjectActionInfoService, InjectBarService,
  Loader, awaitLoad,
} from "@tenon/workbench";
import { IEditModeFeature, ModeType } from "./edit-mode.interface";
import { ToolBarName } from "@/configs/tool-bar-config";
import { configModeMap } from "./config";
import { MessagePlugin } from "tdesign-vue-next";
import { sleep } from "@tenon/shared";

@Controller({
  name: Symbol('edit-mode-controller')
})
export class EditModeController {

  constructor(
    @Inject(BarService) private barService: BarServiceCore,
  ) { }

  @Loader(IEditModeFeature)
  editModeLoader: IDynamicFeature<IEditModeFeature>;

  get editModeFeature() {
    return this.editModeLoader.instance;
  }

  @ActionController(ToolBarName.PreviewMode, ActionType.onClick)
  @ActionController(ToolBarName.EditMode, ActionType.onClick)
  @awaitLoad(IEditModeFeature)
  async handleModeSwitch(
    @InjectBarService() barService: BarServiceCore,
    @InjectActionInfoService() actionInfo: ActionInfo<ModeType>,
  ) {
    if (actionInfo.name === this.editModeFeature!.mode) return;
    barService.setToolBarItemLoading(ToolBarName.Mode, true);
    await sleep(500); // process business
    this.editModeFeature!.switchMode(actionInfo.name);
    barService.setToolBarItemLoading(ToolBarName.Mode, false);

    this.updateToolBar(configModeMap.get(actionInfo.name)!);
    MessagePlugin.success(
      `切换为：${configModeMap.get(actionInfo.name)?.text}`
    );
  }

  updateToolBar(config: Partial<IToolBarSwitchConfig>) {
    this.barService.updateToolBarConfig(
      ToolBarName.Mode,
      config,
    );
  }

}
