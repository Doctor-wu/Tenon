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
import { editorRenderType } from "./reactive";
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
    console.log('handleSwitchRenderType', actionInfo, this);
    switch (actionInfo.name) {
      case ToolBarName.RenderInReact:
        if (editorRenderType.value === EditorRenderType.React) return;
        editorRenderType.value = EditorRenderType.React;
        break;
      case ToolBarName.RenderInVue:
        if (editorRenderType.value === EditorRenderType.Vue) return;
        editorRenderType.value = EditorRenderType.Vue;
        break;
    }
  }

  @ToolBarController(ToolBarName.RenderType, [editorRenderType])
  async getModeConfig(): Promise<ToolBarControllerResult> {
    return renderTypeConfigMap.get(editorRenderType.value)!;
  }
}
