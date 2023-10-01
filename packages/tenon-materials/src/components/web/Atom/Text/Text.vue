<template>
  <span
    v-bind="$attrs"
    class="tenon-material-text"
    :style="props.style || props.__tenon_material_instance__.propMeta.style.default"
    ref="root"
    >{{ props.text || `Vue: ${props.__tenon_material_instance__.propMeta.text.default}` }}</span
  >
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import {
  createTenonEvent, useComponentLifeCycle,
  registerCommonHooks, TenonComponentLifeCycle,
} from "../../../events";
import { TextProps } from "./interface";
import { RendererHost } from "@tenon/engine";

const props = defineProps<TextProps>();

const root = shallowRef<HTMLElement | null>(null);
const eventMeta = props.__tenon_event_meta__;

registerCommonHooks(RendererHost.Vue, eventMeta, root, props.bridge);
const clickHandler = (e) => {
  console.log(props.__tenon_material_instance__.name, createTenonEvent("onClick"), e);
};
const doubleClickHandler = (e) => {
  console.log(
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
</script>

<style lang="scss" scoped>
@import url("./Text.scss");
</style>
