import {
  Feature, Inject
} from "@tenon/workbench";
import { IUndoRedoFeature } from "./undo-redo.interface";
import { BaseMutation } from "@tenon/engine";
import { canRedo, canUndo } from "./reactive";
import { IContext, TenonEditorContext } from "@/core";
import { InvokeMutationNotification, InvokeMutations } from "@/core/notifications/mutation-notification";

@Feature({
  name: IUndoRedoFeature,
})
export class UndoRedoHandler implements IUndoRedoFeature {
  private undoStack: BaseMutation[][] = [];
  private redoStack: BaseMutation[][] = [];

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    this.context.on<InvokeMutationNotification, symbol>(InvokeMutations, (notification) => {
      this.pushUndo(notification.mutations);
    });
  }

  public undo() {
    if (!canUndo.value) return;
    const mutations = this.undoStack.pop()!;
    mutations.forEach(m => {
      m.handle();
    });
    // 逆序 push 到 redoStack
    this.redoStack.push(mutations.map(m => m.reverse()).reverse());
    this.updateState();
  }

  public redo() {
    if (!canRedo.value) return;
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
    canUndo.value = false;
    canRedo.value = false;
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
    canUndo.value = this.undoStack.length > 0;
    canRedo.value = this.redoStack.length > 0;
  }
}
