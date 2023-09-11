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
import { TenonText } from "./Text";
import { CSSProperties, ref } from "vue";
import {
  IMaterialEventMeta,
  IMaterialInternalEventMeta,
  useEventMeta,
} from "../../../events/event-meta";
import type { Bridge } from "@tenon/shared";
import { createTenonEvent, TenonEventPrefix } from "../../../events";

const props = defineProps<{
  style?: CSSProperties;
  text?: string;
  bridge: Bridge<Record<`${typeof TenonEventPrefix}${string}`, any>>;
  __tenon_material_instance__: TenonText;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const root = ref<HTMLElement>();
const eventMeta = props.__tenon_event_meta__;

useEventMeta(eventMeta, root, props.bridge);
props.bridge.register(createTenonEvent('onClick'), (e) => {
  console.log(props.__tenon_material_instance__.name, createTenonEvent('onClick'), e);
});
props.bridge.register(createTenonEvent('onDoubleClick'), (e) => {
  console.log(props.__tenon_material_instance__.name, createTenonEvent('onDoubleClick'), e);
});
</script>

<style lang="scss" scoped>
.tenon-material-text {
  display: block;
}
</style>
