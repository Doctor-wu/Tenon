import { ToolBarName } from "@/configs/tool-bar-config";
import {
  ActionController,
  ActionInfo,
  ActionType,
  Controller, IDynamicFeature, InjectActionInfoService,
  Loader, ToolBarController, ToolBarControllerResult, awaitLoad,
} from "@tenon/workbench";
import { canUndo, canRedo } from "./reactive";
import { IUndoRedoFeature } from "./undo-redo.interface";

@Controller({
  name: Symbol('undo-redo-controller')
})
export class UndoRedoController {

  @Loader(IUndoRedoFeature)
  private undoRedoLoader: IDynamicFeature<IUndoRedoFeature>;

  private get undoRedoFeature() {
    return this.undoRedoLoader.instance!;
  }

  @ToolBarController(ToolBarName.Undo, [canUndo])
  async canUndo(): Promise<ToolBarControllerResult> {
    return {
      disabled: !canUndo.value,
    }
  }

  @ToolBarController(ToolBarName.Redo, [canRedo])
  async canRedo(): Promise<ToolBarControllerResult> {
    return {
      disabled: !canRedo.value,
    }
  }

  @ActionController(ToolBarName.Undo, ActionType.onClick)
  @ActionController(ToolBarName.Redo, ActionType.onClick)
  @awaitLoad(IUndoRedoFeature)
  async handleUndoRedo(
    @InjectActionInfoService() actionInfo: ActionInfo<ToolBarName.Undo | ToolBarName.Redo>,
  ) {
    console.log('handleUndoRedo', actionInfo, this);
    switch (actionInfo.name) {
      case ToolBarName.Redo:
        this.undoRedoFeature.redo();
        break;
      case ToolBarName.Undo:
        this.undoRedoFeature.undo();
        break;
    }
  }
}
