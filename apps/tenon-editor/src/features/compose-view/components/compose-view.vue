<template>
  <section v-if="isEmpty" ref="rootRef" :style="setStyle" class="empty-view-container" :class="{
    editable: materialEditable,
  }" @dragenter.prevent.self="handleDragEnter" @dragover.prevent="() => { }"
    @dragleave.self="(e) => composeViewHandler?.bridge.run('onDragLeave', e)"
    @drop.prevent="(e: any) => composeViewHandler?.bridge.run('onDrop', e)"
    v-bind="{ [DATA_RUNTIME_TREE_ID]: runtimeTree.id }">
    {{ materialEditable ? "Vue: 拖入物料以生成组件" : "" }}
  </section>
  <section v-else ref="rootRef" :style="setStyle" class="view-container" :class="{
    editable: materialEditable,
  }" @dragenter.prevent.self="handleDragEnter" @dragover.prevent="() => { }"
    @dragleave.self="(e) => composeViewHandler?.bridge.run('onDragLeave', e)"
    @drop.prevent="(e: any) => composeViewHandler?.bridge.run('onDrop', e)"
    v-bind="{ [DATA_RUNTIME_TREE_ID]: runtimeTree.id }">
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
import { ModelImpl, ModelHost, RendererHost, RuntimeComponentTreeDestroyEvent, ElementChangeEvent } from "@tenon/engine";
import { CSSProperties, ref, watch } from "vue";
import type { IComposeViewFeature } from "../compose-view.interface";
import type { TenonComposeView } from "../compose-view.material";
import { DATA_RUNTIME_TREE_ID } from "../compose-view.interface";
import { Logger } from "@/utils/logger";

const props = defineProps<{
  setStyle?: CSSProperties;
  isEmpty: boolean;
  composeViewHandler: IComposeViewFeature;
  _bridge: Bridge<Record<string, any>>;
  runtimeTree: ModelImpl[ModelHost.Tree];
  materialEditable?: boolean;
  __tenon_material_instance__: TenonComposeView;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const rootRef = ref<HTMLElement | null>(null);

registerCommonHooks(RendererHost.Vue, props.__tenon_event_meta__, props._bridge);
watch(rootRef, (newEl) => {
  newEl && props._bridge.run(ElementChangeEvent, newEl);
})
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
props._bridge.register(createTenonEvent("onClick"), clickHandler);
props._bridge.register(createTenonEvent("onDoubleClick"), doubleClickHandler);

useComponentLifeCycle(RendererHost.Vue, TenonComponentLifeCycle.UnMount, () => {
  props._bridge.unRegister(createTenonEvent("onClick"), clickHandler);
  props._bridge.unRegister(createTenonEvent("onDoubleClick"), doubleClickHandler);
  props._bridge.run(RuntimeComponentTreeDestroyEvent);
});

const handleDragEnter = (e) => {
  props.composeViewHandler?.bridge.run("onDragEnter", e);
};
</script>
<style lang="scss" scoped>
@import url("../style/compose-view.scss");
</style>
