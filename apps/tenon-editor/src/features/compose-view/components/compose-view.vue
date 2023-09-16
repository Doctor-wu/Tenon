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
    @drop.prevent="(e: any) => composeViewHandler?.bridge.run('onDrop', e)"
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
    @drop.prevent="(e: any) => composeViewHandler?.bridge.run('onDrop', e)"
    :[DATA_RUNTIME_TREE_ID]="runtimeTree.id"
  >
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
import type { Bridge } from "@tenon/shared";
import type { IComposeViewFeature } from "../compose-view.interface";
import type { IMaterialDragFeature } from "@/features/material-drag";
import type { TenonComposeView } from "../compose-view.material";
import { DATA_RUNTIME_TREE_ID } from "../compose-view.interface";
import { CSSProperties, shallowRef } from "vue";
import {
  createTenonEvent,
  IMaterialEventMeta,
  IMaterialInternalEventMeta,
  TenonEvent,
  useEventMeta,
} from "@tenon/materials";
import { ModelImpl, ModelHost, RendererHost } from "@tenon/engine";

const props = defineProps<{
  style?: CSSProperties;
  isEmpty: boolean;
  composeViewHandler: IComposeViewFeature;
  bridge: Bridge<Record<TenonEvent<string>, any>>;
  runtimeTree: ModelImpl[ModelHost.Tree];
  __tenon_material_instance__: TenonComposeView;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const rootRef = shallowRef<HTMLElement | null>(null);
const materialDrag = shallowRef<IMaterialDragFeature | null>(null);
props.composeViewHandler.getMaterialDrag().then((service) => {
  materialDrag.value = service;
});

useEventMeta(RendererHost.Vue, props.__tenon_event_meta__, rootRef, props.bridge);

props.bridge.register(createTenonEvent("onClick"), (e) => {
  console.log(props.__tenon_material_instance__.name, createTenonEvent("onClick"), e);
});
props.bridge.register(createTenonEvent("onDoubleClick"), (e) => {
  console.log(
    props.__tenon_material_instance__.name,
    createTenonEvent("onDoubleClick"),
    e
  );
});

const handleDragEnter = (e) => {
  props.composeViewHandler?.bridge.run("onDragEnter", e);
};
</script>
<style lang="scss" scoped>
@import url("../style/compose-view.scss");
</style>