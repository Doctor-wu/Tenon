import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import type { ModelImpl, ModelHost } from "@tenon/engine";

export interface IRuntimeComponentTreeFeature {
  // interface
  getRuntimeTreeById(id: number): ModelImpl[ModelHost.Tree] | undefined;
  insert(runtimeTree: ModelImpl[ModelHost.Tree], beInsert: string): Promise<void>;
  move(runtimeTree: ModelImpl[ModelHost.Tree], beMove: ModelImpl[ModelHost.Tree]): void;
  buildRuntimeTree(name: string): Promise<ModelImpl[ModelHost.Tree]>;
  initRuntimeTree(runtimeTree: ModelImpl[ModelHost.Tree]): Promise<void>;
}

export const IRuntimeComponentTreeFeature = createDynamicFeatureTag(FeatureName.RuntimeComponentTree);

// bind feature tag here
bindDynamicLoader(IRuntimeComponentTreeFeature, {
  load: async () => {
    const {
      RuntimeComponentTreeHandler,
    } = await import('./runtime-component-tree.handler');
    return RuntimeComponentTreeHandler;
  }
})
