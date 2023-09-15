import { bindDynamicLoader, createSyncFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import type { BaseMutation } from "@tenon/engine";

export interface IUndoRedoFeature {
  // interface
  undo(): void;
  redo(): void;
  pushUndo(items: BaseMutation[]): void;
  clear(): void;
}

export const IUndoRedoFeature = createSyncFeatureTag(FeatureName.UndoRedo);

// bind feature tag here
bindDynamicLoader(IUndoRedoFeature, {
  load: async () => {
    const {
      UndoRedoHandler,
    } = await import('./undo-redo.handler');
    return UndoRedoHandler;
  },
});
