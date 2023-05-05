import {
  DrawerService,
  DrawerServiceCore,
  Feature, IDynamicFeature, Inject, Loader, awaitLoad
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { TenonAtomComponents } from "@tenon/materials";
import { h } from "vue";
import materialListVue from "./components/material-list.vue";
import { IAreaIndicatorFeature } from "../area-indicator";

@Feature({
  name: IMaterialFeature,
})
export class MaterialHandler implements IMaterialFeature {
  isPanelOpen: boolean;
  private atomComponents = Object.keys(TenonAtomComponents);
  private computedComponents = [...this.atomComponents.map(name => TenonAtomComponents[name])];

  @Loader(IAreaIndicatorFeature)
  private areaIndicator: IDynamicFeature<IAreaIndicatorFeature>;

  get [IAreaIndicatorFeature](): IAreaIndicatorFeature {
    return this.areaIndicator.instance!;
  }

  constructor(
    @Inject(DrawerService) private drawerService: DrawerServiceCore,
  ) {
    this.isPanelOpen = false;
  }

  switchPanel(open: boolean) {
    this.isPanelOpen = open;
    if (open) {
      this.openMaterialPanel();
    } else {
      this.closeMaterialPanel();
    }
  }

  @awaitLoad(IAreaIndicatorFeature)
  private openMaterialPanel() {
    console.log('open material panel');
    this.drawerService.left.attachLayer('物料面板', () => {
      return h(materialListVue, {
        materials: this.computedComponents,
      });
    });
    this[IAreaIndicatorFeature].update();
  }

  @awaitLoad(IAreaIndicatorFeature)
  private closeMaterialPanel() {
    console.log('close material panel');
    this[IAreaIndicatorFeature].update();
    this.drawerService.left.detachLayer();
  }
}
