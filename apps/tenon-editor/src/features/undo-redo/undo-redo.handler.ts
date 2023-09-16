import {
  Feature, Inject
} from "@tenon/workbench";
import { IUndoRedoFeature } from "./undo-redo.interface";
import { BaseMutation } from "@tenon/engine";
import { canRedo, canUndo } from "./reactive";
import { IContext, ModelChangeNotification, TenonEditorContext } from "@/core";
import { InvokeMutationNotification, InvokeMutations } from "@/core/notifications/mutation-notification";
import { UndoRedoNotification, UndoRedoType } from "./notification";

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
    this.context.dataEngine.invokeInUndoRedo(...mutations);
    // 逆序 push 到 redoStack
    this.redoStack.push(mutations.map(m => m.reverse()).reverse());
    this.updateState();
    this.notify(mutations, UndoRedoType.Undo);
  }

  public redo() {
    if (!canRedo.value) return;
    const mutations = this.redoStack.pop()!;
    this.context.dataEngine.invokeInUndoRedo(...mutations);
    // 逆序 push 到 undoStack
    this.undoStack.push(mutations.map(m => m.reverse()).reverse());
    this.updateState();
    this.notify(mutations, UndoRedoType.Redo);
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

  private notify(mutations: BaseMutation[], type: UndoRedoType) {
    this.context.fire(
      new UndoRedoNotification(type, mutations),
    );
  }
}
