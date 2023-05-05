<template>
  <span v-bind="$attrs" :style="props.style">{{
    props.text || textMaterial.props.text.default
  }}</span>
</template>
<script setup lang="ts">
import { TenonText } from "./Text";
const textMaterial = new TenonText();
const originProps: {
  [K in keyof TenonText["props"]]: TenonText["props"][K]["type"];
} = {} as any;
const props: {
  [K in keyof TenonText["props"]]: TenonText["props"][K]["type"];
} = defineProps();
</script>
<style lang="scss" scoped></style>
