import { BaseMaterial } from "@tenon/materials";
import { VNode } from "vue";
import { ReactElement } from "react";
import { ModelImpl, ModelType } from "../model";

export enum RendererType {
  Vue = 'vue',
  React = 'react',
}

export interface RenderResultType {
  [RendererType.Vue]: VNode,
  [RendererType.React]: ReactElement,
}

export interface IRenderer<
  Model extends ModelType = ModelType.Tree,
  Render extends RendererType = RendererType.Vue,
> extends BaseMaterial<Render> {
  render(model: ModelImpl[Model], ...args: any[]): RenderResultType[Render];
}
