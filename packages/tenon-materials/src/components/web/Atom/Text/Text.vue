<template>
  <span
    v-bind="$attrs"
    :style="props.style || props.__tenon_material_instance__.props.style.default"
    ref="root"
    >{{ props.text || props.__tenon_material_instance__.props.text.default }}</span
  >
</template>

<script setup lang="ts">
import { TenonText } from "./Text";
import { CSSProperties, onBeforeUnmount, onMounted, ref } from "vue";
import {
  IMaterialEventMeta,
  IMaterialInternalEventMeta,
  MaterialInternalEvent,
  useEventMeta,
} from "../../../events/event-meta";

const props = defineProps<{
  style?: CSSProperties;
  text?: string;
  __tenon_material_instance__: TenonText;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const root = ref<HTMLElement>();
const eventMeta = props.__tenon_event_meta__;

useEventMeta(eventMeta, root, props.__tenon_material_instance__.bridge);
</script>

<style lang="scss" scoped></style>
