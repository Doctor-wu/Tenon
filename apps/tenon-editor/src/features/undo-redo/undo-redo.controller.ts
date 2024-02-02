import { ToolBarName } from "@/configs/tool-bar-config";
import {
  ActionController,
  ActionInfo,
  ActionType,
  Controller, IDynamicFeature, InjectActionInfoService,
  Loader, ToolBarController, ToolBarControllerResult, awaitLoad,
} from "@tenon/workbench";
import { IUndoRedoFeature } from "./undo-redo.interface";
import { getStoreValue } from "@/core";
import { StoreKey } from "@/store";

@Controller({
  name: Symbol('undo-redo-controller')
})
export class UndoRedoController {

  @Loader(IUndoRedoFeature)
  private undoRedoLoader: IDynamicFeature<IUndoRedoFeature>;

  private get undoRedoFeature() {
    return this.undoRedoLoader.instance!;
  }

  @ToolBarController(ToolBarName.Undo, [getStoreValue(StoreKey.CanUndo)])
  async canUndo(): Promise<ToolBarControllerResult> {
    return {
      disabled: !getStoreValue(StoreKey.CanUndo).value,
    }
  }

  @ToolBarController(ToolBarName.Redo, [getStoreValue(StoreKey.CanRedo)])
  async canRedo(): Promise<ToolBarControllerResult> {
    return {
      disabled: !getStoreValue(StoreKey.CanRedo).value,
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
