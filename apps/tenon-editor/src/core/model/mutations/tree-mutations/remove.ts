import { RuntimeTreeNode } from "../..";
import { MutationError } from "../../errors";
import { BaseMutation } from "../base";
import { InsertTreeNodeMutation } from "./insert";

/**
 * Remove a node from a tree
 * the removed node will be destroyed internally
 * @category Tree Mutations
 */
export class RemoveTreeNodeMutation extends BaseMutation {
  public readonly parent: RuntimeTreeNode;
  public readonly source: RuntimeTreeNode;

  constructor(parent: RuntimeTreeNode, source: RuntimeTreeNode) {
    super();
    this.parent = parent;
    this.source = source;
  }

  handle(): unknown {
    const index = this.parent.children.indexOf(this.source);
    if (index === -1) {
      throw new MutationError("Cannot remove node that is not a child");
    }
    this.parent.children.splice(index, 1);
    this.source.destroy();
    return undefined;
  }

  reverse(): unknown {
    const index = this.parent.children.indexOf(this.source);
    if (index === -1) {
      throw new MutationError("Cannot reverse remove node that is not a child");
    }
    return new InsertTreeNodeMutation(this.parent, this.source, index);
  }
}
