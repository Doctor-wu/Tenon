import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { RuntimeTreeNode } from "../../core/model/data-structure/runtime-tree/runtime-tree";
import { IDryMaterial, IWetMaterial, TenonEventPrefix } from "@tenon/materials";

export interface IRuntimeComponentTreeFeature {
  // interface
  getRuntimeTreeById(id: number): RuntimeTreeNode | undefined;
  insert(runtimeTree: RuntimeTreeNode, beInsert: IWetMaterial): Promise<void>;
  move(runtimeTree: RuntimeTreeNode, beMove: RuntimeTreeNode): void;
  buildRuntimeTree(wetMaterial: IDryMaterial): Promise<RuntimeTreeNode>;
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
