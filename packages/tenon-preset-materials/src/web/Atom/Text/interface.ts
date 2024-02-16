import { Bridge } from "@tenon/shared";
import { CSSProperties } from "vue";
import { TenonEventPrefix, IMaterialEventMeta, IMaterialInternalEventMeta } from "../../../../../tenon-material-foundation/src/events";
import { TenonText } from "./Text";

export interface TextProps<CSSType extends CSSProperties | React.CSSProperties = CSSProperties> {
  setStyle?: CSSType;
  text?: string;
  materialEditable: boolean;
  renderInMaterialList: boolean;
  _id: number;
  _bridge: Bridge<Record<string, any>>;
  __tenon_material_instance__: TenonText;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}
