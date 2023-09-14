import { RuntimeTreeNode } from "../..";
import { MutationError } from "../../../errors";
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
  public readonly oldIndex: number;

  constructor(parent: RuntimeTreeNode, source: RuntimeTreeNode) {
    super();
    this.parent = parent;
    this.source = source;
    this.oldIndex = parent.children.indexOf(source);
  }

  handle(): unknown {
    if (this.oldIndex === -1) {
      throw new MutationError("Cannot remove node that is not a child");
    }
    this.parent.children.splice(this.oldIndex, 1);
    return undefined;
  }

  reverse(): BaseMutation {
    return new InsertTreeNodeMutation(this.parent, this.source, this.oldIndex);
  }

  dispose(): void {
    this.source.destroy();
  }
}
