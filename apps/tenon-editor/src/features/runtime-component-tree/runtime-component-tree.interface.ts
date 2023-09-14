import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { RuntimeTreeNode } from "../../core/model/data-structure/runtime-tree/runtime-tree";

export interface IRuntimeComponentTreeFeature {
  // interface
  getRuntimeTreeById(id: number): RuntimeTreeNode | undefined;
  insert(runtimeTree: RuntimeTreeNode, beInsert: string): Promise<void>;
  move(runtimeTree: RuntimeTreeNode, beMove: RuntimeTreeNode): void;
  buildRuntimeTree(name: string): Promise<RuntimeTreeNode>;
  initRuntimeTree(runtimeTree: RuntimeTreeNode): Promise<void>;
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
