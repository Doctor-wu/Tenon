import { VNode, h } from "vue";
import { createElement as createReactElement } from "react";
import { Dict } from "@tenon/shared";
import {
  ModelHost,
  ModelImpl,
  RenderResultType,
  RendererHost,
} from "@tenon/engine";
import {
  IMaterialEventMeta,
  IMaterialInternalEventMeta,
} from "./events/event-meta";

export const MaterialPropsType = {
  String: String as unknown as string,
  Number: Number as unknown as number,
  Boolean: Boolean as unknown as boolean,
  StyleSheet: Object as Record<string | number | symbol, any>,
};

export interface IMaterialPropsMeta {
  name: string;
  type: {
    [K in keyof typeof MaterialPropsType]: (typeof MaterialPropsType)[K];
  }[keyof typeof MaterialPropsType];
  default: any;
  description?: string;
}

export enum MaterialType {
  InternalAtom = "internal-atom",
  Compose = "compose",
}

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
    props: unknown
  ): RenderResultType[InvokeRenderType];

  protected getInternalProps<This extends BaseMaterial<Render>>(this: This) {
    return {
      __tenon_material_instance__: this,
      __tenon_event_meta__: this.eventMeta,
    };
  }

  protected renderLoadingVue() {
    return h('div', {
      class: 't-w-full t-text-blue t-flex t-items-center t-justify-center t-gap-2',
    }, [
      h('div', {
        class: 'i-line-md:loading-loop'
      }),
      h('span', 'loading renderer'),
    ]);
  }

  protected renderErrorVue() {
    return h('div', 'load renderer error');
  }

  protected renderLoadingReact() {
    return createReactElement('div', {
      className: 't-w-full t-text-blue t-flex t-items-center t-justify-center t-gap-2',
    }, [
      createReactElement('div', {
        className: 'i-line-md:loading-loop'
      }),
      createReactElement('span', null, 'loading renderer'),
    ]);
  }

  protected renderErrorReact() {
    return createReactElement('div', {}, 'load renderer error');
  }
}

