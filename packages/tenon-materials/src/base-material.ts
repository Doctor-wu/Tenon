import { VNode } from "vue";

export enum MaterialType {
  InternalAtom = 'internal-atom',
  Compose = 'compose',
}

export interface MaterialEventMeta {
  trigger: (el: HTMLElement, trigger: (e: Event) => void) => void;
  name: string;
}

export class BaseMaterial<P = {}> {
  public type: MaterialType;
  public name: string;
  public icon: string | (() => VNode);
  public description: string | (() => VNode);
  public props: P;
  public eventMeta: MaterialEventMeta[] = [];
}
