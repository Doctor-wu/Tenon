import {
  Feature, IDynamicFeature, Inject, Loader, awaitLoad
} from "@tenon/workbench";
import { IRuntimeComponentTreeFeature } from "./runtime-component-tree.interface";
import { IMaterialFeature } from "../material";
import { DragType, IMaterialDragFeature } from "../material-drag";
import { Ref, watch } from "vue";
import { IAreaIndicatorFeature } from "../area-indicator";
import { SingleMarkType } from "../area-indicator/area-indicator.interface";
import { IEditModeFeature } from "../edit-mode";
import { ModeType } from "../edit-mode/notification";
import { Logger } from "@/utils/logger";
import { IContext, TenonEditorContext } from "@/core";
import {
  ModelType, RuntimeTreeCommands, ModelImpl,
  ElementChangeEvent, RuntimeComponentTreeDestroyEvent, RuntimeTreeNode,
} from "@tenon/engine";

@Feature({
  name: IRuntimeComponentTreeFeature,
})
export class RuntimeComponentTreeHandler implements IRuntimeComponentTreeFeature {
  public runtimeTreeMap: Map<number, ModelImpl[ModelType.Tree]> = new Map();

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

  private get dataEngine() {
    return this.context.dataEngine;
  }

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) { }

  getRuntimeTreeById(id: number) {
    return this.runtimeTreeMap.get(id);
  }

  async insert(runtimeTree: ModelImpl[ModelType.Tree], beInsert: string) {
    console.log('insert', runtimeTree, beInsert);
    const childTree = await this.buildRuntimeTree(beInsert);
    this.dataEngine.invoke(
      RuntimeTreeCommands.pushInsertNode(childTree, runtimeTree),
    );
  }

  move(runtimeTree: ModelImpl[ModelType.Tree], beMove: ModelImpl[ModelType.Tree]) {
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
   * @returns ModelImpl[ModelType.Tree]
   */
  @awaitLoad(IMaterialFeature)
  async buildRuntimeTree(name: string) {
    const model = new RuntimeTreeNode(name);
    this.runtimeTreeMap.set(model.id, model);
    await this.initRuntimeTree(model);
    return model;
  }

  @awaitLoad(IMaterialDragFeature, IAreaIndicatorFeature, IEditModeFeature)
  public async initRuntimeTree(runtimeTree: ModelImpl[ModelType.Tree]) {
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
