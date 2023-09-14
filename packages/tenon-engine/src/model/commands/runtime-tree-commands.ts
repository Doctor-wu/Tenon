import { InsertTreeNodeMutation, MoveTreeNodeMutation, RemoveTreeNodeMutation } from "../mutations";
import { ModelImpl, ModelHost } from "../interface";

/**
 * RuntimeTreeCommands 封装了一系列对 RuntimeTree 的操作
 * 业务层通过调用 RuntimeTreeCommands 的方法来操作 RuntimeTree
 */
export const RuntimeTreeCommands = {
  /**
   * 在指定节点之前插入一个节点
   * @param node 待插入的节点
   * @param relative 相对于哪个节点插入
   * @returns 返回一个 InsertTreeNodeMutation
   */
  insertNodeBefore(node: ModelImpl[ModelHost.Tree], relative: ModelImpl[ModelHost.Tree]) {
    const parent = relative.parent!;
    const index = parent.children.indexOf(relative);
    return new InsertTreeNodeMutation(node, parent, index);
  },

  /**
   * 在指定节点之后插入一个节点
   * @param node 待插入的节点
   * @param relative 相对于哪个节点插入
   * @returns 返回一个 InsertTreeNodeMutation
   */
  insertNodeAfter(node: ModelImpl[ModelHost.Tree], relative: ModelImpl[ModelHost.Tree]) {
    const parent = relative.parent!;
    const index = parent.children.indexOf(relative) + 1;
    return new InsertTreeNodeMutation(node, parent, index);
  },

  /**
   * 在指定节点的孩子节点末尾插入一个节点
   * @param node 待插入的节点
   * @param parent 插入到哪个节点下
   * @returns 返回一个 InsertTreeNodeMutation
   */
  pushInsertNode(node: ModelImpl[ModelHost.Tree], parent: ModelImpl[ModelHost.Tree]) {
    return new InsertTreeNodeMutation(parent, node, parent.children.length);
  },

  /**
   * 移动节点到指定节点之前
   * @param node 待移动的节点
   * @param relative 相对于哪个节点移动
   * @returns 返回一个 MoveTreeNodeMutation
   */
  moveNodeBefore(node: ModelImpl[ModelHost.Tree], relative: ModelImpl[ModelHost.Tree]) {
    const parent = relative.parent!;
    const index = parent.children.indexOf(relative);
    return new MoveTreeNodeMutation(parent, node, index);
  },

  /**
   * 移动节点到指定节点之后
   * @param node 待移动的节点
   * @param relative 相对于哪个节点移动
   * @returns 返回一个 MoveTreeNodeMutation
   */
  moveNodeAfter(node: ModelImpl[ModelHost.Tree], relative: ModelImpl[ModelHost.Tree]) {
    const parent = relative.parent!;
    const index = parent.children.indexOf(relative) + 1;
    return new MoveTreeNodeMutation(parent, node, index);
  },

  /**
   * 移动节点到空容器内
   * @param node 待移动的节点
   * @param parent 移动到哪个节点下
   * @returns 返回一个 MoveTreeNodeMutation
   */
  moveNodeToEmptyContainer(node: ModelImpl[ModelHost.Tree], parent: ModelImpl[ModelHost.Tree]) {
    return new MoveTreeNodeMutation(parent, node, 0);
  },

  /**
   * 移除指定节点
   * @param node 待移除的节点
   * @returns 返回一个 RemoveTreeNodeMutation
   */
  removeNode(node: ModelImpl[ModelHost.Tree]) {
    return new RemoveTreeNodeMutation(node.parent!, node);
  }
}
