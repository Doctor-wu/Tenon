/**
 * 组件 elRef 变化, 可能的场景如下
 * 1. 组件内部 elRef 发生变化
 * 2. 更改 RenderHost 后重新渲染导致的 elRef 的变化
 */
export const ElementChangeEvent = `__element_change__`;
export const RuntimeComponentTreeDestroyEvent = `__runtime_component_tree_destroy__`;
