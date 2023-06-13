<template>
  <section
    v-if="isEmpty"
    ref="rootRef"
    :style="style"
    class="empty-view-container"
    :class="{
      dragging:
        composeViewHandler?.computedDragging &&
        (composeViewHandler?.hoveringRuntimeTreeId as unknown as string) ===
          rootRef?.getAttribute(DATA_RUNTIME_TREE_ID),
    }"
    @dragenter.prevent.self="(e) => composeViewHandler?.bridge.run('onDragEnter', e)"
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
      dragging: composeViewHandler?.computedDragging,
    }"
    @dragenter.prevent.self="(e) => composeViewHandler?.bridge.run('onDragEnter', e)"
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
  useEventMeta,
} from "@tenon/materials";
import type { Bridge } from "@tenon/shared";
import { CSSProperties, ref } from "vue";
import type { IComposeViewFeature } from "../compose-view.interface";
import { DATA_RUNTIME_TREE_ID } from "../compose-view.interface";
import type { TenonComposeView } from "../compose-view.material";

const props = defineProps<{
  style?: CSSProperties;
  isEmpty: boolean;
  composeViewHandler: IComposeViewFeature;
  bridge: Bridge<Record<`tenon-event:${string}`, any>>;
  runtimeTree: RuntimeComponentTree;
  __tenon_material_instance__: TenonComposeView;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const rootRef = ref<HTMLElement>();

useEventMeta(props.__tenon_event_meta__, rootRef, props.bridge);
props.bridge.register("tenon-event:onClick", (e) => {
  console.log(props.__tenon_material_instance__.name, "tenon-event:onClick", e);
});
props.bridge.register("tenon-event:onDoubleClick", (e) => {
  console.log(props.__tenon_material_instance__.name, "tenon-event:onDoubleClick", e);
});
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
  padding: 12px;
  &.dragging {
    padding-bottom: 12px;
  }
}
</style>
