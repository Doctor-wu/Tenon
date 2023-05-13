import {
  DrawerService,
  DrawerServiceCore,
  Feature, IDynamicFeature, Inject, Loader,
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { TenonAtomComponents } from "@tenon/materials";
import { KeepAlive, VNode, h } from "vue";
import materialListVue from "./components/material-list.vue";
import { IAreaIndicatorFeature } from "../area-indicator";

@Feature({
  name: IMaterialFeature,
})
export class MaterialHandler implements IMaterialFeature {
  isPanelOpen: boolean;
  private atomComponents = Object.keys(TenonAtomComponents);
  private computedComponents = Array.from({ length: 10 }, () => this.atomComponents.map(name => new TenonAtomComponents[name])).flat();

  @Loader(IAreaIndicatorFeature)
  private areaIndicator: IDynamicFeature<IAreaIndicatorFeature>;

  get [IAreaIndicatorFeature](): IAreaIndicatorFeature {
    return this.areaIndicator.instance!;
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

  private openMaterialPanel() {
    console.log('open material panel');
    this.drawerService.left.attachLayer(this.layerName, () => h(materialListVue, {
      materials: this.computedComponents,
    }));
  }

  private closeMaterialPanel() {
    console.log('close material panel');
    this.drawerService.left.detachLayer(this.layerName);
  }
}
