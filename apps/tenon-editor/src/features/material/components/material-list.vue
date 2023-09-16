<template>
  <section class="material-list-container">
    <div class="material-list">
      <Card
        v-for="instance in materials"
        :key="instance.model.id"
        class="material-list-item"
        size="small"
        :bordered="true"
        :ref="
          (el: any) => {
            if (!el) return;
            rootRefs.push({ el: el.$el, renderer: instance.renderer!, runtimeTree: instance.model });
          }
        "
      >
        <section class="material-list-item__title">
          <Icon
            :name="(instance.renderer?.icon as string)"
            style="margin-right: 4px"
          ></Icon>
          <span> {{ instance.renderer?.name }}</span>
        </section>
        <section class="material-list-item__desc">
          {{ instance.renderer!.description }}
        </section>
        <section class="material-list-item__preview">
          <component
            :is="instance.renderer.render(RendererHost.Vue, instance.model, {})"
          ></component>
        </section>
      </Card>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "MaterialList",
};
</script>
<script setup lang="ts">
import { Card, Icon } from "tdesign-vue-next";
import { effect, onMounted, onUnmounted, reactive, ref, Ref } from "vue";
import { IRuntimeComponentTreeFeature } from "@/features/runtime-component-tree";
import { RendererManager } from "@/core/renderer";
import { IRenderer, ModelImpl, ModelHost, RendererHost } from "@tenon/engine";
import type { IMaterialFeature } from "../material.interface";
import { Logger } from "@/utils/logger";

const props = defineProps<{
  renderers: {
    [x: string]: IRenderer;
  };
  draggableMaterial: IMaterialFeature["draggableMaterial"];
  runtimeComponentTree: IRuntimeComponentTreeFeature;
  rendererManager: RendererManager;
}>();

const materials: Ref<
  {
    model: ModelImpl[ModelHost.Tree];
    renderer: IRenderer<ModelHost, RendererHost>;
  }[]
> = ref([]);

const rootRefs: {
  el: HTMLElement;
  renderer: IRenderer<ModelHost, RendererHost>;
  runtimeTree: ModelImpl[ModelHost.Tree];
  disposer?: () => void;
}[] = reactive([]);

onMounted(() => {
  effect(() => {
    Promise.all(
      // @TODO(Doctorwu) 这里有潜在的性能问题, 只要 props.materials 发生变化, 每次都会重新构建所有的树
      Object.keys(props.renderers).map(
        async (m) => await props.runtimeComponentTree.buildRuntimeTree(m)
      )
    ).then((trees) => {
      // 物料列表的组件不允许拖拽
      trees.forEach((tree) => {
        tree.draggable = false;
        tree.droppable = false;
      });
      materials.value = trees.map((tree) => ({
        model: tree,
        renderer: props.rendererManager.getRenderer(tree.name),
      }));
    });
  });
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
onUnmounted(() => {
  rootRefs.forEach((item) => {
    item.disposer?.();
  });
  // rootRefs.length = 0;
  materials.value.forEach((m) => {
    m.model.destroy();
  });
  materials.value.length = 0;
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
    .material-list-item {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 12px;
      cursor: pointer;
      border-bottom: 1px solid #e8e8e8;
      transition: all 0.3s ease-in-out;
      &:hover {
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);
      }
      ::v-deep(.t-card__body) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: flex-start;
      }
      .material-list-item__title {
        height: 25px;
        display: flex;
        width: 100%;
        margin-bottom: 8px;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;
        font-size: 16px;
        color: #333;
      }
      .material-list-item__desc {
        flex: 1;
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        color: #999;
        margin-bottom: 8px;
      }
      .material-list-item__preview {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}
</style>
