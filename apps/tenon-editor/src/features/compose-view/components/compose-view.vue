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
    Vue: 拖入物料以生成组件
  </section>
  <section
    v-else
    ref="rootRef"
    :style="style"
    class="view-container"
    :class="{
      dragging: materialDrag?.computedDragging.value,
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
import {
  createTenonEvent,
  IMaterialEventMeta,
  IMaterialInternalEventMeta,
  TenonComponentLifeCycle,
  TenonEvent,
  useComponentLifeCycle,
  registerCommonHooks,
} from "@tenon/material-foundation";
import { ModelImpl, ModelHost, RendererHost } from "@tenon/engine";
import { CSSProperties, shallowRef } from "vue";
import type { IComposeViewFeature } from "../compose-view.interface";
import type { TenonComposeView } from "../compose-view.material";
import type { IMaterialDragFeature } from "@/features/material-drag";
import { DATA_RUNTIME_TREE_ID } from "../compose-view.interface";
import { Logger } from "@/utils/logger";

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

registerCommonHooks(RendererHost.Vue, props.__tenon_event_meta__, rootRef, props.bridge);
const clickHandler = (e) => {
  Logger.log(props.__tenon_material_instance__.name, createTenonEvent("onClick"), e);
};
const doubleClickHandler = (e) => {
  Logger.log(
    props.__tenon_material_instance__.name,
    createTenonEvent("onDoubleClick"),
    e
  );
};
props.bridge.register(createTenonEvent("onClick"), clickHandler);
props.bridge.register(createTenonEvent("onDoubleClick"), doubleClickHandler);

useComponentLifeCycle(RendererHost.Vue, TenonComponentLifeCycle.UnMount, () => {
  props.bridge.unRegister(createTenonEvent("onClick"), clickHandler);
  props.bridge.unRegister(createTenonEvent("onDoubleClick"), doubleClickHandler);
});

const handleDragEnter = (e) => {
  props.composeViewHandler?.bridge.run("onDragEnter", e);
};
</script>
<style lang="scss" scoped>
@import url("../style/compose-view.scss");
</style>
