import { Dict } from "@tenon/shared";
import { VNode } from "vue";

export const MaterialPropsType = {
  String,
  Number,
  Boolean,
  StyleSheet,
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
  name: string;
}

export abstract class BaseMaterial {
  public type: MaterialType;
  public abstract name: string;
  public abstract icon: string | (() => VNode);
  public abstract description: string;
  public props: Dict<IMaterialPropsMeta>;
  public eventMeta: IMaterialEventMeta[] = [];
  public abstract render(...args: any): VNode;
}
