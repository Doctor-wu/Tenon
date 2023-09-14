import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import type { ModelImpl, ModelType } from "@tenon/engine";

export interface IRuntimeComponentTreeFeature {
  // interface
  getRuntimeTreeById(id: number): ModelImpl[ModelType.Tree] | undefined;
  insert(runtimeTree: ModelImpl[ModelType.Tree], beInsert: string): Promise<void>;
  move(runtimeTree: ModelImpl[ModelType.Tree], beMove: ModelImpl[ModelType.Tree]): void;
  buildRuntimeTree(name: string): Promise<ModelImpl[ModelType.Tree]>;
  initRuntimeTree(runtimeTree: ModelImpl[ModelType.Tree]): Promise<void>;
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
