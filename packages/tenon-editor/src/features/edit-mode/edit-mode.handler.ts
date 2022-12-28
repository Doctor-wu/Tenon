import {
  Feature
} from "@tenon/workbench";
import { IEditModeFeature } from "./edit-mode.interface";

@Feature({
  name: IEditModeFeature,
})
export class EditModeHandler implements IEditModeFeature {
}
