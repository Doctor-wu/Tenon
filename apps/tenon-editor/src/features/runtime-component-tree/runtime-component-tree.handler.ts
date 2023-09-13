import {
  Feature, IDynamicFeature, Inject, Loader, awaitLoad
} from "@tenon/workbench";
import { IRuntimeComponentTreeFeature } from "./runtime-component-tree.interface";
import { IDryMaterial, IWetMaterial } from "@tenon/materials";
import { IMaterialFeature } from "../material";
import { DragType, IMaterialDragFeature } from "../material-drag";
import { Ref, effect, watch } from "vue";
import { IAreaIndicatorFeature } from "../area-indicator";
import { SingleMarkType } from "../area-indicator/area-indicator.interface";
import { IEditModeFeature } from "../edit-mode";
import { ModeType } from "../edit-mode/notification";
import { ElementChangeEvent, IDataEngine, RuntimeComponentTreeDestroyEvent, RuntimeTreeCommands, RuntimeTreeNode, TenonDataEngine } from "@/core/model";
import { Logger } from "@/utils/logger";

@Feature({
  name: IRuntimeComponentTreeFeature,
})
export class RuntimeComponentTreeHandler implements IRuntimeComponentTreeFeature {
  public runtimeTreeMap: Map<number, RuntimeTreeNode> = new Map();

  @Loader(IEditModeFeature)
  private editModeFeature!: IDynamicFeature<IEditModeFeature>;

  private get editMode() {
    return this.editModeFeature.instance!;
  }

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

  constructor(
    @Inject(IDataEngine) private dataEngine: TenonDataEngine,
  ) { }

  getRuntimeTreeById(id: number) {
    return this.runtimeTreeMap.get(id);
  }

  async insert(runtimeTree: RuntimeTreeNode, beInsert: string) {
    console.log('insert', runtimeTree, beInsert);
    const childTree = await this.buildRuntimeTree(beInsert);
    this.dataEngine.invoke(
      RuntimeTreeCommands.pushInsertNode(childTree, runtimeTree),
    );
  }

  move(runtimeTree: RuntimeTreeNode, beMove: RuntimeTreeNode) {
    Logger.log('move', runtimeTree, beMove);
    if (!runtimeTree.children.length) {
      this.dataEngine.invoke(
        RuntimeTreeCommands.moveNodeToEmptyContainer(beMove, runtimeTree),
      );
    } else {
      this.dataEngine.invoke(
        RuntimeTreeCommands.moveNodeAfter(beMove, runtimeTree.children.at(-1)!),
      );
    }
  }

  /**
   * Build runtime tree
   * @param name Renderer name
   * @returns RuntimeTreeNode
   */
  @awaitLoad(IMaterialFeature)
  async buildRuntimeTree(name: string) {
    const model = new RuntimeTreeNode(name);
    this.runtimeTreeMap.set(model.id, model);
    await this.initRuntimeTree(model);
    return model;
  }

  @awaitLoad(IMaterialDragFeature, IAreaIndicatorFeature, IEditModeFeature)
  private async initRuntimeTree(runtimeTree: RuntimeTreeNode) {
    runtimeTree.bridge.register(ElementChangeEvent, (elRef: Ref<HTMLElement>) => {
      const disEffect = watch(elRef, (newEl, oldEl) => {
        if (!newEl) return;
        if (oldEl && newEl.isEqualNode(oldEl)) return;
        if (oldEl) {
          this.disposeElement(oldEl);
        }
        if (runtimeTree.draggable) {
          (newEl as any).elDragDisposer = this.areaIndicator
            .useSingletonHoverMark(SingleMarkType.DragHover, newEl,
              () => this.editMode.mode.value !== ModeType.Edit,
            );
          (newEl as any).elDropDisposer = this.materialDrag
            .draggableElement(newEl, DragType.Component, () => runtimeTree);
        }
        if (runtimeTree.droppable) {
        }
      }, {
        immediate: true,
      });
      runtimeTree.bridge.register(RuntimeComponentTreeDestroyEvent, () => {
        disEffect();
        runtimeTree.el?.value && this.disposeElement(runtimeTree.el?.value);
        runtimeTree.el = undefined;
      });
    });
  }

  private disposeElement(el: HTMLElement) {
    Logger.log('dispose element', el);
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
