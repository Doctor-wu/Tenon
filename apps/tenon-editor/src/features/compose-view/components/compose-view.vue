<template>
  <section
    v-if="isEmpty"
    ref="rootRef"
    :style="style"
    class="empty-view-container"
    :class="{
      dragging:
      materialDrag?.computedDragging &&
        (composeViewHandler?.hoveringRuntimeTreeId as unknown as string) ===
          rootRef?.getAttribute(DATA_RUNTIME_TREE_ID),
    }"
    @dragenter.prevent.self="handleDragEnter"
    @dragover.prevent="() => {}"
    @dragleave.self="(e) => composeViewHandler?.bridge.run('onDragLeave', e)"
    @drop.prevent="(e) => composeViewHandler?.bridge.run('onDrop', e)"
    :[DATA_RUNTIME_TREE_ID]="runtimeTree.id"
  >
    拖入物料以生成组件
  </section>
  <section
    v-else
    ref="rootRef"
    :style="style"
    class="view-container"
    :class="{
      dragging: materialDrag?.computedDragging,
    }"
    @dragenter.prevent.self="handleDragEnter"
    @dragover.prevent="() => {}"
    @dragleave.self="(e) => composeViewHandler?.bridge.run('onDragLeave', e)"
    @drop.prevent="(e) => composeViewHandler?.bridge.run('onDrop', e)"
    :[DATA_RUNTIME_TREE_ID]="runtimeTree.id"
  >
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
import { RuntimeComponentTree } from "@/features/runtime-component-tree";
import {
  IMaterialEventMeta,
  IMaterialInternalEventMeta,
  TenonEventPrefix,
  useEventMeta,
} from "@tenon/materials";
import { DATA_RUNTIME_TREE_ID } from "../compose-view.interface";
import { CSSProperties, ref, shallowRef } from "vue";
import type { Bridge } from "@tenon/shared";
import type { IComposeViewFeature } from "../compose-view.interface";
import type { IMaterialDragFeature } from "@/features/material-drag";
import type { TenonComposeView } from "../compose-view.material";

const props = defineProps<{
  style?: CSSProperties;
  isEmpty: boolean;
  composeViewHandler: IComposeViewFeature;
  bridge: Bridge<Record<`${typeof TenonEventPrefix}${string}`, any>>;
  runtimeTree: RuntimeComponentTree;
  __tenon_material_instance__: TenonComposeView;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const rootRef = ref<HTMLElement>();
const materialDrag = shallowRef<IMaterialDragFeature | null>(null);
props.composeViewHandler.getMaterialDrag().then((service) => {
  materialDrag.value = service;
});

useEventMeta(props.__tenon_event_meta__, rootRef, props.bridge);

props.bridge.register(`${TenonEventPrefix}onClick`, (e) => {
  console.log(props.__tenon_material_instance__.name, `${TenonEventPrefix}onClick`, e);
});
props.bridge.register(`${TenonEventPrefix}onDoubleClick`, (e) => {
  console.log(
    props.__tenon_material_instance__.name,
    `${TenonEventPrefix}onDoubleClick`,
    e
  );
});

const handleDragEnter = (e) => {
  props.composeViewHandler?.bridge.run('onDragEnter', e);
};
</script>
<style lang="scss" scoped>
.empty-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  border: 1px dashed #999;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
}
.view-container {
  border: 1px dashed #999;
  // padding: 12px;
  &.dragging {
    padding-bottom: 12px;
  }
}
</style>
