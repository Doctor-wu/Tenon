<template>
  <span :style="textStyle">
    <slot>{{ textValue.value }}</slot>
  </span>
</template>
<script setup lang="ts">
import { CSSProperties } from 'vue';

const props = defineProps<{
  textValue: {
    value: string;
  },
  textStyle: CSSProperties;
}>();

</script>

<style lang="scss" scoped>
</style>