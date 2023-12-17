import { ToolBarName } from "@/configs/tool-bar-config";
import {
  ActionController,
  ActionInfo,
  ActionType,
  Controller,
  InjectActionInfoService,
  ToolBarController,
  ToolBarControllerResult,
} from "@tenon/workbench";
import { StoreKey, getStoreValue, setStoreValue } from "@/store";
import { EditorRenderType } from "./editor-render-type.interface";
import { renderTypeConfigMap } from "./config";

@Controller({
  name: Symbol('editor-render-type-controller')
})
export class EditorRenderTypeController {

  @ActionController(ToolBarName.RenderInReact, ActionType.onClick)
  @ActionController(ToolBarName.RenderInVue, ActionType.onClick)
  handleSwitchRenderType(
    @InjectActionInfoService() actionInfo: ActionInfo<ToolBarName.RenderInReact | ToolBarName.RenderInVue>,
  ) {
    const currentRenderType = getStoreValue(StoreKey.EditorRenderType).value;
    console.log('handleSwitchRenderType', actionInfo, this);
    switch (actionInfo.name) {
      case ToolBarName.RenderInReact:
        if (currentRenderType === EditorRenderType.React) return;
        setStoreValue(StoreKey.EditorRenderType, EditorRenderType.React);
        break;
      case ToolBarName.RenderInVue:
        if (currentRenderType === EditorRenderType.Vue) return;
        setStoreValue(StoreKey.EditorRenderType, EditorRenderType.Vue);
        break;
    }
  }

  @ToolBarController(ToolBarName.RenderType, [getStoreValue(StoreKey.EditorRenderType)])
  async getModeConfig(): Promise<ToolBarControllerResult> {
    const currentRenderType = getStoreValue(StoreKey.EditorRenderType).value;
    return renderTypeConfigMap.get(currentRenderType)!;
  }
}
