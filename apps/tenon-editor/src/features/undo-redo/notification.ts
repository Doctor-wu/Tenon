import { BaseNotification } from "@/core";
import { BaseMutation } from "@tenon/engine";

export enum UndoRedoType {
  Undo = 'UndoNotificationType',
  Redo = 'RedoNotificationType',
}

export class UndoRedoNotification extends BaseNotification<UndoRedoType> {
  public mutations: BaseMutation[];
  constructor(type: UndoRedoType, mutations: BaseMutation[]) {
    super(type);
    this.mutations = mutations;
  }
}
