import { RuntimeTreeNode } from "../../data-structure";
import { MutationError } from "../../errors";
import { BaseMutation } from "../base";
import { InsertTreeNodeMutation } from "./insert";

export class MoveTreeNodeMutation extends InsertTreeNodeMutation {
  oldParent: RuntimeTreeNode;
  newParent: RuntimeTreeNode;
  oldIndex: number;

  constructor(newParent: RuntimeTreeNode, source: RuntimeTreeNode, index: number) {
    super(newParent, source, index);
    if (!source.parent) {
      throw new MutationError(
        "Cannot move a node that does not have a parent"
      );
    }
    this.oldParent = source.parent;
    this.newParent = newParent;
    this.oldIndex = source.parent.children.indexOf(source) ?? -1;
  }

  reverse(): BaseMutation {
    return new InsertTreeNodeMutation(this.oldParent, this.source, this.oldIndex);
  }
}
