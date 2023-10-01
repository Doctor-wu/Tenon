import { Dict } from "@tenon/shared";
import { ModelHost, ModelImpl, RenderResultType, RendererHost } from "@tenon/engine";
import { VNode } from "vue";
import { IMaterialEventMeta, IMaterialInternalEventMeta } from "./events/event-meta";

export const MaterialPropsType = {
  String: String as unknown as string,
  Number: Number as unknown as number,
  Boolean: Boolean as unknown as boolean,
  StyleSheet: Object as Record<string | number | symbol, any>,
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
  public abstract formatName: string;
  public abstract icon: string | (() => VNode);
  public abstract description: string;
  public propMeta: Dict<IMaterialPropsMeta>;
  public eventMeta: (IMaterialEventMeta | IMaterialInternalEventMeta)[] = [];
  public nestable = false;
  public abstract readonly supportRenderHost: Render[];
  public abstract render<InvokeRenderType extends Render>(
    type: InvokeRenderType,
    model: ModelImpl[ModelHost],
    props: unknown,
  ): RenderResultType[InvokeRenderType];

  protected getInternalProps<This extends BaseMaterial<Render>>(this: This) {
    return {
      __tenon_material_instance__: this,
      __tenon_event_meta__: this.eventMeta,
    }
  }
}
