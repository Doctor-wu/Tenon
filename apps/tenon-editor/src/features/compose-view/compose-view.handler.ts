import {
  Feature, IDynamicFeature, Inject, Loader, awaitLoad
} from "@tenon/workbench";
import { DATA_RUNTIME_TREE_ID, IComposeViewBridge, IComposeViewFeature } from "./compose-view.interface";
import { TenonComposeView } from './compose-view.material';
import { Ref, effect, ref } from "vue";
import { IContext, TenonEditor, TenonEditorContext } from "@/core";
import { DragNotification, DragStatusChange } from "../material-drag/notification";
import { Bridge } from "@tenon/shared";
import { IAreaIndicatorFeature } from "../area-indicator";
import { SingleMarkType } from "../area-indicator/area-indicator.interface";
import { IEditModeFeature } from "../edit-mode";
import { DragType, IMaterialDragFeature } from "../material-drag";
import { RuntimeTreeNode } from "@/core/model";
import { IRuntimeComponentTreeFeature } from "../runtime-component-tree";
import type { RendererManager } from "@/core/renderer";

@Feature({
  name: IComposeViewFeature,
})
export class ComposeViewHandler implements IComposeViewFeature {
  public bridge = new Bridge<IComposeViewBridge>();
  public hoveringRuntimeTreeId: Ref<string | undefined> = ref(undefined);
  private draggingDisposer?: () => void;
  private editor: TenonEditor | undefined;

  @Loader(IAreaIndicatorFeature)
  private areaIndicatorFeature!: IDynamicFeature<IAreaIndicatorFeature>;

  private get areaIndicator() {
    return this.areaIndicatorFeature.instance!;
  }

  @Loader(IMaterialDragFeature)
  private materialDragFeature!: IDynamicFeature<IMaterialDragFeature>;

  private get materialDrag() {
    return this.materialDragFeature.instance!;
  }

  @Loader(IRuntimeComponentTreeFeature)
  private runtimeComponentTreeFeature: IDynamicFeature<IRuntimeComponentTreeFeature>;

  private get runtimeComponentTree() {
    return this.runtimeComponentTreeFeature.instance!;
  }

  private get rendererManager() {
    return this.context.rendererManager;
  }

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    this.initEvent();
  }

  $onEditorOpen(editor: TenonEditor) {
    this.editor = editor;
  }

  @awaitLoad(IMaterialDragFeature)
  async getMaterialDrag() {
    return this.materialDrag;
  }

  @awaitLoad(IRuntimeComponentTreeFeature)
  async getComposeView() {
    return new TenonComposeView(this, this.rendererManager, this.runtimeComponentTree);
  }

  @awaitLoad(IEditModeFeature)
  private initEvent() {
    this.context.on(DragStatusChange, (notification: DragNotification) => {
      if (!notification.dragging) {
        this.handleDragEnd();
      }
    });
    this.bridge.register('onDragEnter', (e) => this.handleDragEnter(e));
    this.bridge.register('onDragLeave', (e) => this.handleDragLeave(e));
    this.bridge.register('onDrop', (e) => this.handleDrop(e));
  }

  @awaitLoad(IAreaIndicatorFeature)
  private async handleDragEnter(e: DragEvent) {
    e.stopPropagation();
    this.clearDragDisposer();
    if (e.target === null) return;
    this.hoveringRuntimeTreeId.value = (e.target as HTMLElement).getAttribute(DATA_RUNTIME_TREE_ID) || undefined;
    setTimeout(async () => {
      this.draggingDisposer = await this.areaIndicator
        .useSingletonMark(SingleMarkType.DropHovering, e.target as HTMLElement);
    });
  }

  @awaitLoad(IMaterialDragFeature, IRuntimeComponentTreeFeature)
  private async handleDrop(e: DragEvent) {
    this.clearDragDisposer();
    e.stopPropagation();
    const runtimeTreeId = (e.target as HTMLElement).getAttribute(DATA_RUNTIME_TREE_ID);
    console.log('drop', runtimeTreeId);
    if (!runtimeTreeId) return;
    const runtimeTree = this.runtimeComponentTree.getRuntimeTreeById(Number(runtimeTreeId));
    console.log('drop', runtimeTreeId, runtimeTree);
    if (!runtimeTree) return;
    if (!runtimeTree.droppable) return e.preventDefault();
    const dragType = e.dataTransfer!.getData('dragType') as DragType;
    const payload = this.materialDrag.getDragPayload(e, dragType);
    if (dragType === DragType.Material) {
      await this.runtimeComponentTree.insert(runtimeTree, payload as string);
    } else if (dragType === DragType.Component) {
      this.runtimeComponentTree.move(runtimeTree, payload as RuntimeTreeNode);
    }
  }

  private handleDragLeave(e: DragEvent) {
    this.clearDragDisposer();
  }

  private handleDragEnd() {
    this.clearDragDisposer();
  }

  private clearDragDisposer() {
    if (this.draggingDisposer) {
      this.draggingDisposer();
    }
    this.draggingDisposer = undefined;
  }

}
