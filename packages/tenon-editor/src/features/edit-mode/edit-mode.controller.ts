import {
  ActionController,
  ActionInfo,
  ActionType,
  BarService,
  BarServiceCore,
  Controller,
  IDynamicFeature,
  Inject,
  InjectActionInfoService,
  Loader,
  ToolBarController,
  ToolBarControllerResult,
  awaitLoad,
} from "@tenon/workbench";
import { IEditModeFeature } from "./edit-mode.interface";
import { ToolBarName } from "@/configs/tool-bar-config";
import { configModeMap } from "./config";
import { MessagePlugin } from "tdesign-vue-next";
import { sleep } from "@tenon/shared";
import { ModeType } from "./notification";
import { EditorMode } from "./reactive";

@Controller({
  name: Symbol("edit-mode-controller"),
})
export class EditModeController {
  constructor(@Inject(BarService) private barService: BarServiceCore) {}

  @Loader(IEditModeFeature)
  editModeLoader: IDynamicFeature<IEditModeFeature>;

  get editModeFeature() {
    return this.editModeLoader.instance;
  }

  @ActionController(ToolBarName.PreviewMode, ActionType.onClick)
  @ActionController(ToolBarName.EditMode, ActionType.onClick)
  @awaitLoad(IEditModeFeature)
  async handleModeSwitch(
    @InjectActionInfoService() actionInfo: ActionInfo<ModeType>
  ) {
    if (actionInfo.name === this.editModeFeature!.mode.value) return;
    this.barService.setToolBarItemLoading(ToolBarName.Mode, true);
    await sleep(500); // process business
    this.editModeFeature!.switchMode(actionInfo.name);
    this.barService.setToolBarItemLoading(ToolBarName.Mode, false);

    MessagePlugin.success(
      `切换为：${configModeMap.get(actionInfo.name)?.text}`
    );
  }

  @ToolBarController(ToolBarName.Mode, [EditorMode])
  @awaitLoad(IEditModeFeature)
  async getModeConfig(): Promise<ToolBarControllerResult> {
    return configModeMap.get(EditorMode.value)!;
  }
}
