import { BaseMutation, RemoveTreeNodeMutation } from "../../mutations";
import { RuntimeTreeNode } from "../../structure";

export class InsertTreeNodeMutation extends BaseMutation {
  public parent: RuntimeTreeNode;
  public source: RuntimeTreeNode;
  public index: number;

  constructor(parent: RuntimeTreeNode, source: RuntimeTreeNode, index: number) {
    super();
    this.parent = parent;
    this.source = source;
    this.index = index;
  }

  handle(): unknown {
    this.parent.children.splice(this.index, 0, this.source);
    this.source.parent = this.parent;
    return this.parent;
  }

  reverse(): BaseMutation {
    return new RemoveTreeNodeMutation(this.parent, this.source);
  }

  dispose(): void {}
}
