import { ToolBarName } from "@/configs/tool-bar-config";
import {
  ActionController,
  ActionInfo,
  ActionType,
  BarService,
  BarServiceCore,
  Controller,
  DrawerServiceCore,
  IDynamicFeature,
  IToolBarSwitchConfig,
  Inject,
  InjectActionInfoService,
  InjectDrawerService,
  InternalUIService,
  Loader,
  awaitLoad,
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { h } from "vue";
import {
  IContext,
  LeftDrawerNotificationType,
  TenonEditorContext,
} from "@/core";

@Controller({
  name: Symbol("material-controller"),
})
export class MaterialController {
  @Loader(IMaterialFeature)
  materialLoader: IDynamicFeature<IMaterialFeature>;

  get materialFeature() {
    return this.materialLoader.instance;
  }

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
    @Inject(BarService) private barService: BarServiceCore
  ) {
    this.listenDrawer();
  }

  @ActionController(ToolBarName.MaterialSwitch, ActionType.onActive)
  @ActionController(ToolBarName.MaterialSwitch, ActionType.onDeActive)
  @awaitLoad(IMaterialFeature)
  handleMaterialSwitch(
    @InjectActionInfoService() actionInfo: ActionInfo,
  ) {
    console.log(actionInfo);
    this.materialFeature!.switchPanel(
      actionInfo.action === ActionType.onActive
    );
  }

  private listenDrawer() {
    this.context.on(LeftDrawerNotificationType.ClOSE_FROM_INTERNAL, () => {
      if (!this.barService.getSwitchActive(ToolBarName.MaterialSwitch)) return;
      this.barService.emitAction(
        ToolBarName.MaterialSwitch,
        ActionType.onDeActive,
        InternalUIService.Drawer
      );
      this.barService!.updateToolBarConfig<IToolBarSwitchConfig>(
        ToolBarName.MaterialSwitch,
        {
          active: false,
        }
      );
    });
  }
}
