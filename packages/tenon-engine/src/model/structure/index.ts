/**
 * Data Structure 作为 Editor 的底层数据结构用来承载 Editor 数据
 * 可以实现不同的 Data Structure 来实现不同的 Editor
 * 例如树形结构的 Editor, 可以使用 Tree 来实现, 图形结构的 Editor, 可以使用 Graph 来实现等等
 * 每个 Data Structure 都需要实现适用于自身的一套 Mutation 方法, 用于修改自身的数据以及处理 Undo/Redo
 */

export * from './runtime-tree';
