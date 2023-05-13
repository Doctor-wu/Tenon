import { Bridge, Dict, Subscribe } from "@tenon/shared";
import { VNode, CSSProperties } from "vue";
import { IMaterialInternalEventMeta } from "./events/internal-meta";

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

export interface IMaterialEventMeta {
  trigger: (el: HTMLElement, trigger: (e: Event) => void) => void;
  desc: string;
  name: string;
}


export abstract class BaseMaterial{
  public type: MaterialType;
  public bridge: Bridge<Record<`tenon-event:${string}`, any>> = new Bridge();
  public abstract name: string;
  public abstract icon: string | (() => VNode);
  public abstract description: string;
  public props: Dict<IMaterialPropsMeta>;
  public eventMeta: (IMaterialEventMeta | IMaterialInternalEventMeta)[] = [];
  public abstract render(props: unknown): VNode;

  protected getInternalProps(this: BaseMaterial) {
    return {
      __tenon_material_instance__: this,
      __tenon_event_meta__: this.eventMeta,
    }
  }
}
