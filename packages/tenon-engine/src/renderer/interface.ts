import { BaseMaterial, IMaterialRenderOptions } from "@tenon/material-foundation";
import { VNode } from "vue";
import { FC } from "react";
import { ModelImpl, ModelHost } from "../model";

export enum RendererHost {
  Vue = 'vue',
  React = 'react',
}

export interface RenderResultType {
  [RendererHost.Vue]: VNode,
  [RendererHost.React]: ReturnType<FC>,
}

export interface IRenderer<
  Model extends ModelHost = ModelHost.Tree,
  Render extends RendererHost = RendererHost.Vue,
> extends BaseMaterial<Render> {
  render<RendererInvokeType extends Render>(
    type: RendererInvokeType,
    model: ModelImpl[Model],
    props: unknown,
    options: IMaterialRenderOptions,
  ): RenderResultType[RendererInvokeType];
}
