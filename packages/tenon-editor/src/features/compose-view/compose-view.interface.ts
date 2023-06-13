import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { TenonComposeView } from "./compose-view.material";
import { Bridge } from "@tenon/shared";
import { Ref } from "vue";

export const DATA_RUNTIME_TREE_ID = 'data-runtime-tree-id';

export interface IComposeViewBridge {
    onDragEnter: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
}

export interface IComposeViewFeature {
  // interface
  computedDragging: Ref<boolean>;
  hoveringRuntimeTreeId: Ref<string | undefined>;
  bridge: Bridge<IComposeViewBridge>;
  getComposeView(): TenonComposeView;
}

export const IComposeViewFeature = createDynamicFeatureTag(FeatureName.ComposeView);

// bind feature tag here
bindDynamicLoader(IComposeViewFeature, {
  load: async () => {
    const {
      ComposeViewHandler,
    } = await import('./compose-view.handler');
    return ComposeViewHandler;
  }
});
