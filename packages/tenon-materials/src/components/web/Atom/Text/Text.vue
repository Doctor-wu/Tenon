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
import { CSSProperties, onMounted, ref } from "vue";

const props = defineProps<{
  style?: CSSProperties;
  text?: string;
  __tenon_material_instance__: TenonText;
  __tenon_event_meta__: IMaterialEventMeta[];
  __trigger_tenon_event__: (eventName: string, e: Event) => void;
}>();

const root = ref<HTMLElement>();
const eventMeta = props.__tenon_event_meta__;

onMounted(() => {
  eventMeta.forEach((meta) => {
    meta.trigger(root.value!, (e) => {
      props.__trigger_tenon_event__(`tenon-event:${meta.name}`, e);
    });
  });
});
</script>

<style lang="scss" scoped></style>
