import { ToolBarName } from "@/configs/tool-bar-config";
import { ServiceName, UndoRedoService } from "@/services";
import {
  ActionController,
  ActionInfo,
  ActionType,
  Controller, IDynamicFeature, Inject, InjectActionInfoService, Loader, ToolBarController, ToolBarControllerResult, awaitLoad,
} from "@tenon/workbench";

@Controller({
  name: Symbol('runtime-component-tree-controller')
})
export class RuntimeComponentTreeController {
  @Loader(ServiceName.UndoRedoService)
  fullScreenFeatureLoader: IDynamicFeature<UndoRedoService>;

  get undoRedoService() {
    return this.fullScreenFeatureLoader.instance;
  }

  @ToolBarController(ToolBarName.Undo, [UndoRedoService.canUndo])
  async canUndo(): Promise<ToolBarControllerResult> {
    return {
      disabled: !UndoRedoService.canUndo.value,
    }
  }

  @ToolBarController(ToolBarName.Redo, [UndoRedoService.canRedo])
  async canRedo(): Promise<ToolBarControllerResult> {
    return {
      disabled: !UndoRedoService.canRedo.value,
    }
  }

  @ActionController(ToolBarName.Undo, ActionType.onClick)
  @ActionController(ToolBarName.Redo, ActionType.onClick)
  @awaitLoad(ServiceName.UndoRedoService)
  async handleUndoRedo(
    @InjectActionInfoService() actionInfo: ActionInfo<ToolBarName.Undo | ToolBarName.Redo>,
  ) {
    console.log('handleUndoRedo', actionInfo);
    switch (actionInfo.name) {
      case ToolBarName.Redo:
        this.undoRedoService!.redo();
        break;
      case ToolBarName.Undo:
        this.undoRedoService!.undo();
        break;
    }
  }
}
