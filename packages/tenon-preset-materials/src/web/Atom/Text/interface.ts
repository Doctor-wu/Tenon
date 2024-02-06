import { Bridge } from "@tenon/shared";
import { CSSProperties } from "vue";
import { TenonEventPrefix, IMaterialEventMeta, IMaterialInternalEventMeta } from "../../../../../tenon-materials/src/events";
import { TenonText } from "./Text";

export interface TextProps<CSSType extends CSSProperties | React.CSSProperties = CSSProperties> {
  style?: CSSType;
  text?: string;
  _id: number;
  _bridge: Bridge<Record<`${typeof TenonEventPrefix}${string}`, unknown>>;
  __tenon_material_instance__: TenonText;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}
