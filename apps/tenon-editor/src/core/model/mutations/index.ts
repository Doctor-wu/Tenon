/**
 * Mutations 是对 Editor 的 Model 进行修改的方法集合
 * 不同的 Model 有不同的 Mutations
 * 例如对于 Block Model，有 insertBlock, removeBlock 等方法
 * 对于 Tree Model，有 insertChild, removeChild 等方法
 * 每个 Mutation 需要对应一个或多个 Inverse Mutation，用于撤销
 */

export * from "./base";
export * from "./tree-mutations";
