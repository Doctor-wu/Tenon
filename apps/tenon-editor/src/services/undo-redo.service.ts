import { Service } from "@tenon/workbench";
import { ServiceName } from "./service-name";
import { ref } from "vue";
import { BaseMutation } from "@/core/model";

@Service({
  name: ServiceName.UndoRedoService,
})
export class UndoRedoService {
  static canUndo = ref(false);
  static canRedo = ref(false);
  private undoStack: BaseMutation[][] = [];
  private redoStack: BaseMutation[][] = [];

  public undo() {
    if (!UndoRedoService.canUndo.value) return;
    const mutations = this.undoStack.pop()!;
    mutations.forEach(m => {
      m.handle();
    });
    // 逆序 push 到 redoStack
    this.redoStack.push(mutations.map(m => m.reverse()).reverse());
    this.updateState();
  }

  public redo() {
    if (!UndoRedoService.canRedo.value) return;
    const mutations = this.redoStack.pop()!;
    mutations.forEach(m => {
      m.handle();
    });
    // 逆序 push 到 undoStack
    this.undoStack.push(mutations.map(m => m.reverse()).reverse());
    this.updateState();
  }

  public pushUndo(items: BaseMutation[]) {
    this.undoStack.push(items.map(m => m.reverse()));
    this.clearRedo();
    this.updateState();
  }

  public clear() {
    this.clearUndo();
    this.clearRedo();
    this.updateState();
    UndoRedoService.canUndo.value = false;
    UndoRedoService.canRedo.value = false;
  }
  private clearUndo() {
    this.undoStack.forEach(ms => ms.forEach(m => m.dispose()));
    this.undoStack = [];
  }

  private clearRedo() {
    this.redoStack.forEach(ms => ms.forEach(m => m.dispose()));
    this.redoStack = [];
  }

  private updateState() {
    UndoRedoService.canUndo.value = this.undoStack.length > 0;
    UndoRedoService.canRedo.value = this.redoStack.length > 0;
  }
}
