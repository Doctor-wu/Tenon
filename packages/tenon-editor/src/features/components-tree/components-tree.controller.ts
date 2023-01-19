import { ToolBarName } from "@/configs/tool-bar-config";
import {
  ActionController,
  ActionInfo,
  ActionType,
  Controller,
  DrawerServiceCore,
  InjectActionInfoService,
  InjectDrawerService,
} from "@tenon/workbench";
import { h } from "vue";

@Controller({
  name: Symbol('components-tree-controller')
})
export class ComponentsTreeController {

  @ActionController(ToolBarName.ComponentTreeSwitch, ActionType.onActive)
  @ActionController(ToolBarName.ComponentTreeSwitch, ActionType.onDeActive)
  handleMaterialSwitch(
    @InjectActionInfoService() actionInfo: ActionInfo,
    @InjectDrawerService() drawerService: DrawerServiceCore,
  ) {
    console.log(actionInfo);
    switch (actionInfo.action) {
      case ActionType.onActive:
        drawerService.left.attachLayer(actionInfo.name, () => h('span', 'components-tree'));
        break;
      case ActionType.onDeActive:
        drawerService.left.detachLayer(actionInfo.name);
        break;
      default:
        return;
    }
  }
}
