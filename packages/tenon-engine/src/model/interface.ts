import type { RuntimeTreeNode } from "./structure";

export enum ModelType {
  Tree = "tree",
}

export interface ModelImpl {
  [ModelType.Tree]: RuntimeTreeNode;
}
