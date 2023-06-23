import {
  Feature
} from "@tenon/workbench";
import { IComponentsTreeFeature } from "./components-tree.interface";

@Feature({
  name: IComponentsTreeFeature,
})
export class ComponentsTreeHandler implements IComponentsTreeFeature {
}
