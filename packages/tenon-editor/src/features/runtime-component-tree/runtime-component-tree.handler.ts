import {
  Feature, IDynamicFeature, Loader, awaitLoad
} from "@tenon/workbench";
import { ElementChangeEvent, IRuntimeComponentTreeFeature, RuntimeComponentTreeDestroyEvent } from "./runtime-component-tree.interface";
import { IDryMaterial, IWetMaterial } from "@tenon/materials";
import { IMaterialFeature } from "../material";
import { RuntimeComponentTree } from "./runtime-component-tree";
import { DragType, IMaterialDragFeature } from "../material-drag";
import { Ref, effect, nextTick } from "vue";
import { IAreaIndicatorFeature } from "../area-indicator";
import { SingleMarkType } from "../area-indicator/area-indicator.interface";

@Feature({
  name: IRuntimeComponentTreeFeature,
})
export class RuntimeComponentTreeHandler implements IRuntimeComponentTreeFeature {
  public runtimeTreeMap: Map<number, RuntimeComponentTree> = new Map();

  @Loader(IMaterialFeature)
  private materialFeature: IDynamicFeature<IMaterialFeature>;

  private get material() {
    return this.materialFeature.instance!;
  }

  @Loader(IMaterialDragFeature)
  private materialDragFeature: IDynamicFeature<IMaterialDragFeature>;

  private get materialDrag() {
    return this.materialDragFeature.instance!;
  }

  @Loader(IAreaIndicatorFeature)
  private areaIndicatorFeature: IDynamicFeature<IAreaIndicatorFeature>;

  private get areaIndicator() {
    return this.areaIndicatorFeature.instance!;
  }

  getRuntimeTreeById(id: number) {
    return this.runtimeTreeMap.get(id);
  }

  async insert(runtimeTree: RuntimeComponentTree, beInsert: IWetMaterial) {
    const childTree = await this.buildRuntimeTree(beInsert);
    childTree.parent = runtimeTree;
    runtimeTree.children.push(childTree);
  }

  move(runtimeTree: RuntimeComponentTree, beMove: RuntimeComponentTree) {
    console.log('move', runtimeTree, beMove);
    const index = beMove.parent!.children.indexOf(beMove);
    beMove.parent!.children.splice(index, 1);
    runtimeTree.children.push(beMove);
  }

  @awaitLoad(IMaterialFeature)
  async buildRuntimeTree(dryMaterial: IDryMaterial) {
    const wetMaterial = this.material.getWetMaterial(dryMaterial);
    if (!wetMaterial) {
      throw new Error(`Can not find wet material for ${dryMaterial.name}`);
    }
    const runtimeTree = new RuntimeComponentTree(wetMaterial);
    this.runtimeTreeMap.set(runtimeTree.id, runtimeTree);
    if (dryMaterial.children) {
      for (const child of dryMaterial.children) {
        const childRuntimeTree = await this.buildRuntimeTree(child);
        childRuntimeTree.parent = runtimeTree;
        runtimeTree.children.push(childRuntimeTree);
      }
    }
    await this.initRuntimeTree(runtimeTree);
    return runtimeTree;
  }

  @awaitLoad(IMaterialDragFeature, IAreaIndicatorFeature)
  private async initRuntimeTree(runtimeTree: RuntimeComponentTree) {
    runtimeTree.bridge.register(ElementChangeEvent, (elRef: Ref<HTMLElement>) => {
      const disEffect = effect(() => {
        const newEl = elRef.value;
        const oldEl = runtimeTree.el;
        if (!newEl) return;
        if (oldEl && newEl.isEqualNode(oldEl)) return;
        if (oldEl) {
          this.disposeElement(oldEl);
        }
        runtimeTree.el = newEl;
        if (runtimeTree.draggable) {
          (newEl as any).elDropDisposer = this.materialDrag
            .draggableElement(newEl, DragType.Component, () => runtimeTree);
          (newEl as any).elDragDisposer = this.areaIndicator.useSingletonHoverMark(SingleMarkType.DragHover, newEl);
        }
      });
      runtimeTree.bridge.register(RuntimeComponentTreeDestroyEvent, () => {
        disEffect();
        this.disposeElement(runtimeTree.el!);
        runtimeTree.el = undefined;
      });
    });
  }

  private disposeElement(el: HTMLElement) {
    console.log('dispose element', el);
    setTimeout(() => {
      if ((el as any).elDropDisposer) {
        (el as any).elDropDisposer();
      }
      if ((el as any).elDragDisposer) {
        (el as any).elDragDisposer.then(disposer => disposer());
      }
    });
  }
}
