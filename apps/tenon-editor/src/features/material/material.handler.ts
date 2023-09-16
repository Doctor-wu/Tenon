import {
  DrawerService,
  DrawerServiceCore,
  Feature, IDynamicFeature, Inject, Loader, awaitLoad,
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { TenonAtomComponents } from "@tenon/materials";
import { h, reactive } from "vue";
import { IAreaIndicatorFeature } from "@tenon-features/area-indicator";
import { IMaterialDragFeature, DragType } from "@tenon-features/material-drag";
import materialListVue from "./components/material-list.vue";
import { IComposeViewFeature } from "../compose-view";
import { IRuntimeComponentTreeFeature } from "../runtime-component-tree";
import { Logger } from "@/utils/logger";
import { IContext, TenonEditorContext } from "@/core";
import type { IRenderer, ModelHost, RendererHost } from "@tenon/engine";

@Feature({
  name: IMaterialFeature,
})
export class MaterialHandler implements IMaterialFeature {
  isPanelOpen: boolean;
  private renderers: {
    [x: string]: IRenderer<ModelHost, RendererHost>;
  } = reactive(Object.keys(TenonAtomComponents).reduce((acc, key) => {
    const renderer = new TenonAtomComponents[key as keyof typeof TenonAtomComponents];
    return {
      ...acc,
      [renderer.name]: renderer,
    }
  }, {}));

  @Loader(IAreaIndicatorFeature)
  private areaIndicator: IDynamicFeature<IAreaIndicatorFeature>;

  get [IAreaIndicatorFeature](): IAreaIndicatorFeature {
    return this.areaIndicator.instance!;
  }

  @Loader(IMaterialDragFeature)
  private materialDrag: IDynamicFeature<IMaterialDragFeature>;

  get [IMaterialDragFeature](): IMaterialDragFeature {
    return this.materialDrag.instance!;
  }

  @Loader(IRuntimeComponentTreeFeature)
  private runtimeComponentTree: IDynamicFeature<IRuntimeComponentTreeFeature>;

  private get runtimeTree() {
    return this.runtimeComponentTree.instance!;
  }

  private layerName = '物料面板';

  private get dataEngine() {
    return this.context.dataEngine;
  }
  private get rendererManager() {
    return this.context.rendererManager;
  }

  constructor(
    @Inject(DrawerService) private drawerService: DrawerServiceCore,
    @Inject(IComposeViewFeature) private composeView: IComposeViewFeature,
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    this.isPanelOpen = false;
    Object.keys(this.renderers).forEach(name => {
      this.rendererManager.registerRenderer(name, this.renderers[name]);
    });
    this.initRoot();
  }

  switchPanel(open: boolean) {
    this.isPanelOpen = open;
    if (open) {
      this.openMaterialPanel();
    } else {
      this.closeMaterialPanel();
    }
  }

  @awaitLoad(IRuntimeComponentTreeFeature)
  async initRoot() {
    const composeViewRenderer = await this.composeView.getComposeView();
    this.rendererManager.registerRenderer(composeViewRenderer.name, composeViewRenderer);
    this.renderers[composeViewRenderer.name] = composeViewRenderer;
    this.runtimeTree.buildRuntimeTree(composeViewRenderer.name).then(tree => {
      this.dataEngine.setRoot(tree);
    });
  }

  @awaitLoad(IMaterialDragFeature)
  async draggableMaterial(
    el: HTMLElement,
    getPayload: () => string,
  ) {
    return this.materialDrag.instance!.draggableElement(el, DragType.Material, getPayload);
  }

  // getWetMaterial(dryMaterial: IDryMaterial): IWetMaterial | undefined {
  //   return this.computedComponents.find(component => component().name === dryMaterial.name)?.();
  // }

  @awaitLoad(IRuntimeComponentTreeFeature)
  private async openMaterialPanel() {
    Logger.log('open material panel');
    this.drawerService.left.attachLayer(this.layerName, () => h(materialListVue, {
      renderers: this.renderers,
      draggableMaterial: this.draggableMaterial.bind(this),
      runtimeComponentTree: this.runtimeTree,
      rendererManager: this.rendererManager,
    }));
  }

  private closeMaterialPanel() {
    Logger.log('close material panel');
    this.drawerService.left.detachLayer(this.layerName);
  }
}
