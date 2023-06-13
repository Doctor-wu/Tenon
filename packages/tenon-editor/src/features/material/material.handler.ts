import {
  DrawerService,
  DrawerServiceCore,
  Feature, IDynamicFeature, Inject, Loader, awaitLoad,
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { BaseMaterial, IDryMaterial, IWetMaterial, TenonAtomComponents } from "@tenon/materials";
import { h } from "vue";
import { IAreaIndicatorFeature } from "@tenon-features/area-indicator";
import { IMaterialDragFeature, DragType } from "@tenon-features/material-drag";
import materialListVue from "./components/material-list.vue";
import { IComposeViewFeature } from "../compose-view";
import { IDataEngine, TenonDataEngine } from "@/core/model/data-engine";
import { IRuntimeComponentTreeFeature } from "../runtime-component-tree";

@Feature({
  name: IMaterialFeature,
})
export class MaterialHandler implements IMaterialFeature {
  isPanelOpen: boolean;
  private atomComponents = Object.keys(TenonAtomComponents);
  private computedComponents: (() => IWetMaterial)[]
    = this.atomComponents.map(name => () => new TenonAtomComponents[name]);

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

  constructor(
    @Inject(DrawerService) private drawerService: DrawerServiceCore,
    @Inject(IComposeViewFeature) private composeView: IComposeViewFeature,
  ) {
    this.isPanelOpen = false;
    this.computedComponents.unshift(this.composeView.getComposeView);
  }

  switchPanel(open: boolean) {
    this.isPanelOpen = open;
    if (open) {
      this.openMaterialPanel();
    } else {
      this.closeMaterialPanel();
    }
  }

  @awaitLoad(IMaterialDragFeature)
  async draggableMaterial(
    el: HTMLElement,
    getPayload: () => BaseMaterial,
  ) {
    return this.materialDrag.instance!.draggableElement(el, DragType.Material, getPayload);
  }

  getWetMaterial(dryMaterial: IDryMaterial): IWetMaterial | undefined {
    return this.computedComponents.find(component => component().name === dryMaterial.name)?.();
  }

  @awaitLoad(IRuntimeComponentTreeFeature)
  private async openMaterialPanel() {
    console.log('open material panel');
    this.drawerService.left.attachLayer(this.layerName, () => h(materialListVue, {
      materials: this.computedComponents,
      draggableMaterial: this.draggableMaterial.bind(this),
      runtimeComponentTree: this.runtimeTree,
    }));
  }

  private closeMaterialPanel() {
    console.log('close material panel');
    this.drawerService.left.detachLayer(this.layerName);
  }
}
