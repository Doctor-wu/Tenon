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
import { IMaterialEventMeta } from "../../../base-component";
import { CSSProperties, onBeforeUnmount, onMounted, ref } from "vue";
import {
  IMaterialInternalEventMeta,
  MaterialInternalEvent,
} from "../../../events/internal-meta";

const props = defineProps<{
  style?: CSSProperties;
  text?: string;
  __tenon_material_instance__: TenonText;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}>();

const root = ref<HTMLElement>();
const eventMeta = props.__tenon_event_meta__;

onMounted(() => {
  eventMeta.forEach((meta) => {
    if ("internal" in meta) return;
    meta.trigger(root.value!, (e) => {
      props.__tenon_material_instance__.bridge.run(`tenon-event:${meta.name}`, e);
    });
  });
  props.__tenon_material_instance__.bridge.run(
    `tenon-event:${MaterialInternalEvent.Mount}`
  );
});

onBeforeUnmount(() => {
  props.__tenon_material_instance__.bridge.run(
    `tenon-event:${MaterialInternalEvent.UnMount}`
  );
});
</script>

<style lang="scss" scoped></style>
