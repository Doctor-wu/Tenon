import { BaseMaterial } from "@tenon/materials";
import { VNode } from "vue";
import { ReactElement } from "react";
import { ModelImpl, ModelHost } from "../model";

export enum RendererHost {
  Vue = 'vue',
  React = 'react',
}

export interface RenderResultType {
  [RendererHost.Vue]: VNode,
  [RendererHost.React]: ReactElement,
}

export interface IRenderer<
  Model extends ModelHost = ModelHost.Tree,
  Render extends RendererHost = RendererHost.Vue,
> extends BaseMaterial<Render> {
  render(model: ModelImpl[Model], ...args: unknown[]): RenderResultType[Render];
}
