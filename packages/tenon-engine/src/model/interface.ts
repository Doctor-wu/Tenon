import type { RuntimeTreeNode } from "./structure";

export enum ModelHost {
  Tree = "tree",
}

export interface ModelImpl {
  [ModelHost.Tree]: RuntimeTreeNode;
}
