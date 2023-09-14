import { ToolBarName } from "@/configs/tool-bar-config";
import {
  DrawerNotification,
  IContext,
  LeftDrawerNotificationType,
  TenonEditorContext,
} from "@/core";
import { Logger } from "@/utils/logger";
import {
  ActionController,
  ActionInfo,
  ActionType,
  BarService,
  BarServiceCore,
  Controller,
  DrawerServiceCore,
  EventEmitterCore,
  EventEmitterService,
  IToolBarSwitchConfig,
  Inject,
  InjectActionInfoService,
  InjectDrawerService,
  InternalUIService,
  WorkbenchEvents,
} from "@tenon/workbench";
import { h } from "vue";

@Controller({
  name: Symbol("components-tree-controller"),
})
export class ComponentsTreeController {
  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
    @Inject(BarService) private barService: BarServiceCore,
    @Inject(IContext) private context: TenonEditorContext
  ) {
    this.listenDrawer();
  }

  @ActionController(ToolBarName.ComponentTreeSwitch, ActionType.onActive)
  @ActionController(ToolBarName.ComponentTreeSwitch, ActionType.onDeActive)
  handleMaterialSwitch(
    @InjectActionInfoService() actionInfo: ActionInfo,
    @InjectDrawerService() drawerService: DrawerServiceCore
  ) {
    Logger.log(actionInfo);
    switch (actionInfo.action) {
      case ActionType.onActive:
        drawerService.left.attachLayer(actionInfo.name, () =>
          h("span", "components-tree")
        );
        break;
      case ActionType.onDeActive:
        drawerService.left.detachLayer(actionInfo.name);
        break;
      default:
        return;
    }
  }

  private listenDrawer() {
    this.context.on(
      LeftDrawerNotificationType.ClOSE_FROM_INTERNAL,
      () => {
        if (!this.barService.getSwitchActive(ToolBarName.ComponentTreeSwitch)) return;
        this.barService.emitAction(
          ToolBarName.ComponentTreeSwitch,
          ActionType.onDeActive,
          InternalUIService.Drawer
        );
        this.barService!.updateToolBarConfig<IToolBarSwitchConfig>(
          ToolBarName.ComponentTreeSwitch,
          {
            active: false,
          }
        );
      }
    );
  }
}
