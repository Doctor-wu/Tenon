<template>
  <section class="material-list-container">
    <div class="material-list">
      <MaterialCard v-for="instance in materials" :key="instance.model.id" class="material-list-item" size="small"
        :renderer="instance.renderer" :model="instance.model" :ref="(el: any) => {
          if (!el) return;
          rootRefs.push({ el: el.$el, renderer: instance.renderer!, runtimeTree: instance.model });
        }
          ">
      </MaterialCard>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "MaterialList",
};
</script>
<script setup lang="ts">
import { effect, onBeforeUnmount, onMounted, onUnmounted, reactive } from "vue";
import { IRuntimeComponentTreeFeature } from "@/features/runtime-component-tree";
import { RendererManager } from "@/core/renderer";
import { IRenderer, ModelImpl, ModelHost, RendererHost } from "@tenon/engine";
import {
  computedAsync,
} from "@vueuse/core"
import type { IMaterialFeature } from "../material.interface";
import MaterialCard from "./material-card.vue";

const props = defineProps<{
  renderers: {
    [x: string]: IRenderer;
  };
  draggableMaterial: IMaterialFeature["draggableMaterial"];
  runtimeComponentTree: IRuntimeComponentTreeFeature;
  rendererManager: RendererManager;
}>();

const materials = computedAsync(async () => {
  return Promise.all(
    // @TODO(Doctorwu) 这里有潜在的性能问题, 只要 props.renderers 发生变化, 每次都会重新构建所有的树
    Object.keys(props.renderers).map(
      async (m) => await props.runtimeComponentTree.buildRuntimeTree(m)
    )
  ).then((trees) => {
    // 物料列表的组件不允许拖拽
    trees.forEach((tree) => {
      tree.draggable = false;
      tree.droppable = false;
    });
    return trees.map((tree) => ({
      model: tree,
      renderer: props.rendererManager.getRenderer(tree.name),
    }));
  });
})

const rootRefs: {
  el: HTMLElement;
  renderer: IRenderer<ModelHost, RendererHost>;
  runtimeTree: ModelImpl[ModelHost.Tree];
  disposer?: () => void;
}[] = reactive([]);


onMounted(() => {
  effect(() => {
    rootRefs.forEach(async (item, index) => {
      if (!item.disposer) {
        item.disposer = () => undefined;
        const disposer = await props.draggableMaterial(item.el, () => item.renderer.name);
        rootRefs[index].disposer = disposer;
      }
    });
  });
});
onBeforeUnmount(() => {
  rootRefs.forEach((item) => {
    item.disposer?.();
    item.runtimeTree.destroy();
  });
});
</script>
<style lang="scss" scoped>
.material-list-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .material-list {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
