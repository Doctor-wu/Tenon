import { bindDynamicLoader, createDynamicFeatureTag } from "@tenon/workbench";
import { FeatureName } from "../feature-name";
import { RuntimeComponentTree } from "./runtime-component-tree";
import { IDryMaterial, IWetMaterial, TenonEventPrefix } from "@tenon/materials";

export const ElementChangeEvent = `${TenonEventPrefix}__element_change__`;
export const RuntimeComponentTreeDestroyEvent = `${TenonEventPrefix}__runtime_component_tree_destroy__`;

export interface IRuntimeComponentTreeFeature {
  // interface
  getRuntimeTreeById(id: number): RuntimeComponentTree | undefined;
  insert(runtimeTree: RuntimeComponentTree, beInsert: IWetMaterial): Promise<void>;
  move(runtimeTree: RuntimeComponentTree, beMove: RuntimeComponentTree): void;
  buildRuntimeTree(wetMaterial: IDryMaterial): Promise<RuntimeComponentTree>;
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
