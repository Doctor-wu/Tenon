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
import { ModeType } from "../edit-mode/notification";
import { DragType, IMaterialDragFeature } from "../material-drag";
import type { RuntimeComponentTree } from "@/core/model";
import { BaseMaterial } from "@tenon/materials";
import { IRuntimeComponentTreeFeature } from "../runtime-component-tree";

@Feature({
  name: IComposeViewFeature,
})
export class ComposeViewHandler implements IComposeViewFeature {
  public bridge = new Bridge<IComposeViewBridge>();
  public computedDragging: Ref<boolean> = ref(false);
  public hoveringRuntimeTreeId: Ref<string | undefined> = ref(undefined);
  private dragging = ref(false);
  private draggingDisposer?: () => void;
  private editor: TenonEditor | undefined;

  @Loader(IAreaIndicatorFeature)
  private areaIndicatorFeature!: IDynamicFeature<IAreaIndicatorFeature>;

  private get areaIndicator() {
    return this.areaIndicatorFeature.instance!;
  }

  @Loader(IEditModeFeature)
  private editModeFeature!: IDynamicFeature<IEditModeFeature>;

  private get editMode() {
    return this.editModeFeature.instance!;
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

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    this.initEvent();
  }

  $onEditorOpen(editor: TenonEditor) {
    this.editor = editor;
  }

  getComposeView = () => {
    return new TenonComposeView(this);
  }

  @awaitLoad(IEditModeFeature)
  private initEvent() {
    this.context.on(DragStatusChange, (notification: DragNotification) => {
      this.dragging.value = notification.dragging;
      console.log('DragStatusChange', notification.dragging);
      if (!notification.dragging) {
        this.handleDragEnd();
      }
    });
    effect(() => {
      const value = this.dragging.value
        && this.editMode.mode.value === ModeType.Edit;
      this.computedDragging.value = value;
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
    e.stopPropagation();
    const runtimeTreeId = (e.target as HTMLElement).getAttribute(DATA_RUNTIME_TREE_ID);
    if (!runtimeTreeId) return;
    const runtimeTree = this.runtimeComponentTree.getRuntimeTreeById(Number(runtimeTreeId));
    console.log('handleDrop', runtimeTreeId, runtimeTree);
    if (!runtimeTree) return;
    if (!runtimeTree.droppable) return;
    const dragType = e.dataTransfer!.getData('dragType') as DragType;
    const payload = this.materialDrag.getDragPayload(e, dragType);
    if (dragType === DragType.Material) {
      await this.runtimeComponentTree.insert(runtimeTree, payload as BaseMaterial);
    } else if (dragType === DragType.Component) {
      this.runtimeComponentTree.move(runtimeTree, payload as RuntimeComponentTree);
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
