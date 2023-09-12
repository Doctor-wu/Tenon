import { BaseMaterial } from "@tenon/materials";
import type { VNode } from "vue";
import { RuntimeTreeNode } from "../model";

export interface IRenderer<T extends any = RuntimeTreeNode> extends BaseMaterial {
  render(model: T, ...args: any[]): VNode;
}
