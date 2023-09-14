import { ModelImpl, ModelHost } from "../../interface";
import { BaseMutation, RemoveTreeNodeMutation } from "../../mutations";

export class InsertTreeNodeMutation extends BaseMutation {
  public parent: ModelImpl[ModelHost.Tree];
  public source: ModelImpl[ModelHost.Tree];
  public index: number;

  constructor(parent: ModelImpl[ModelHost.Tree], source: ModelImpl[ModelHost.Tree], index: number) {
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
