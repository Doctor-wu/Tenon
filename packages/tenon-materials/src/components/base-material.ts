import { Dict } from "@tenon/shared";
import { RenderResultType, RendererHost } from "@tenon/engine";
import { VNode, CSSProperties } from "vue";
import { IMaterialEventMeta, IMaterialInternalEventMeta } from "./events/event-meta";

export const MaterialPropsType = {
  String: String as unknown as string,
  Number: Number as unknown as number,
  Boolean: Boolean as unknown as boolean,
  StyleSheet: Object as unknown as CSSProperties,
}

export interface IMaterialPropsMeta {
  name: string;
  type: {
    [K in keyof typeof MaterialPropsType]: typeof MaterialPropsType[K];
  }[keyof typeof MaterialPropsType];
  default: any;
  description?: string;
}

export enum MaterialType {
  InternalAtom = 'internal-atom',
  Compose = 'compose',
};



export abstract class BaseMaterial<Render extends RendererHost> {
  public type: MaterialType;
  public abstract name: string;
  public abstract icon: string | (() => VNode);
  public abstract description: string;
  public propMeta: Dict<IMaterialPropsMeta>;
  public eventMeta: (IMaterialEventMeta | IMaterialInternalEventMeta)[] = [];
  public nestable = false;
  public abstract render(model: any, props: unknown): RenderResultType[Render];

  protected getInternalProps(this: BaseMaterial<Render>) {
    return {
      __tenon_material_instance__: this,
      __tenon_event_meta__: this.eventMeta,
    }
  }
}
