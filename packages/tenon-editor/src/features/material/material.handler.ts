import {
  Feature
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";

@Feature({
  name: IMaterialFeature,
})
export class MaterialHandler implements IMaterialFeature {
  isPanelOpen: boolean;

  switchPanel(open: boolean) {
    console.log(`material panel: ${open ? 'open' : 'close'}`);
    this.isPanelOpen = open;
  }
}
