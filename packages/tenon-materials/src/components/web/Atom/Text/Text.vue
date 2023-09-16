<template>
  <span
    v-bind="$attrs"
    class="tenon-material-text"
    :style="props.style || props.__tenon_material_instance__.propMeta.style.default"
    ref="root"
    >{{ props.text || props.__tenon_material_instance__.propMeta.text.default }}</span
  >
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import {
  useEventMeta,
} from "../../../events/event-meta";
import { createTenonEvent } from "../../../events";
import { TextProps } from "./interface";
import { RendererHost } from "@tenon/engine";

const props = defineProps<TextProps>();

const root = shallowRef<HTMLElement | null>(null);
const eventMeta = props.__tenon_event_meta__;

useEventMeta(RendererHost.Vue, eventMeta, root, props.bridge);
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
</script>

<style lang="scss" scoped>
@import url("./Text.scss");
</style>
