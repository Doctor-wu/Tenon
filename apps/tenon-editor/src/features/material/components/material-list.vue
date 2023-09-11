<template>
  <section class="material-list-container">
    <div class="material-list">
      <Card
        v-for="runtimeTree in runtimeTreeInstances"
        :bordered="true"
        class="material-list-item"
        size="small"
        :ref="
          (el) => {
            if (!el) return;
            rootRefs.push({ el: el.$el, material: runtimeTree.material!, runtimeTree: runtimeTree });
          }
        "
      >
        <section class="material-list-item__title">
          <Icon :name="runtimeTree.material!.icon" style="margin-right: 4px"></Icon>
          <span> {{ runtimeTree.material!.name }}</span>
        </section>
        <section class="material-list-item__desc">
          {{ runtimeTree.material!.description }}
        </section>
        <section class="material-list-item__preview">
          <component :is="runtimeTree.render()"></component>
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
import { BaseMaterial } from "@tenon/materials";
import { IMaterialFeature } from "../material.interface";
import { effect, onMounted, onUnmounted, reactive } from "vue";
import { RuntimeTree } from "@/core/model";
import { IRuntimeComponentTreeFeature } from "@/features/runtime-component-tree";

const props = defineProps<{
  materials: (() => BaseMaterial)[];
  draggableMaterial: IMaterialFeature["draggableMaterial"];
  runtimeComponentTree: IRuntimeComponentTreeFeature;
}>();

const runtimeTreeInstances: RuntimeTree[] = reactive([]);

const rootRefs: {
  el: HTMLElement;
  material: BaseMaterial;
  runtimeTree: RuntimeTree;
  disposer?: () => void;
}[] = [];
onMounted(() => {
  effect(() => {
    Promise.all(
      // @TODO(Doctorwu) 这里有潜在的性能问题, 只要 props.materials 发生变化, 每次都会重新构建所有的树
      props.materials.map(
        async (m) => await props.runtimeComponentTree.buildRuntimeTree(m())
      )
    )
      .then((trees) => {
        // 物料列表的组件不允许拖拽
        trees.forEach(tree => {
          tree.draggable = false;
          tree.droppable = false;
        });
        runtimeTreeInstances.push(...trees);
      })
      .then(() => {
        rootRefs.forEach(async (item, index) => {
          const disposer = await props.draggableMaterial(item.el, () => item.material);
          rootRefs[index].disposer = disposer;
        });
      });
  });
});
onUnmounted(() => {
  rootRefs.forEach((item) => {
    item.disposer?.();
  });
  rootRefs.length = 0;
  runtimeTreeInstances.forEach((m) => {
    m.destroy();
  });
  runtimeTreeInstances.length = 0;
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
