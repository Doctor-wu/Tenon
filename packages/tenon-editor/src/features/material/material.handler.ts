import {
  DrawerService,
  DrawerServiceCore,
  Feature, IDynamicFeature, Inject, Loader, awaitLoad,
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { BaseMaterial, TenonAtomComponents } from "@tenon/materials";
import { h } from "vue";
import { IAreaIndicatorFeature } from "@tenon-features/area-indicator";
import { IMaterialDragFeature, DragType } from "@tenon-features/material-drag";
import materialListVue from "./components/material-list.vue";

@Feature({
  name: IMaterialFeature,
})
export class MaterialHandler implements IMaterialFeature {
  isPanelOpen: boolean;
  private atomComponents = Object.keys(TenonAtomComponents);
  private computedComponents = this.atomComponents.map(name => new TenonAtomComponents[name]);

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

  private layerName = '物料面板';

  constructor(
    @Inject(DrawerService) private drawerService: DrawerServiceCore,
  ) {
    this.isPanelOpen = false;
    this.computedComponents[0].bridge.register("tenon-event:onClick", () => {
      console.log("click");
    });
    this.computedComponents[0].bridge.register("tenon-event:onDoubleClick", () => {
      console.log("double click");
    });
    this.computedComponents.forEach((material) => {
      material.bridge.register("tenon-event:onMount", () => {
        console.log(`mount ${material.name}`);
      });
      material.bridge.register("tenon-event:onUnMount", () => {
        console.log(`unmount ${material.name}`);
      });
    });
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

  private async openMaterialPanel() {
    console.log('open material panel');
    // const materialListVue = (await import('./components/material-list.vue')).default;
    this.drawerService.left.attachLayer(this.layerName, () => h(materialListVue, {
      materials: this.computedComponents,
      draggableMaterial: this.draggableMaterial.bind(this),
    }));
  }

  private closeMaterialPanel() {
    console.log('close material panel');
    this.drawerService.left.detachLayer(this.layerName);
  }
}
