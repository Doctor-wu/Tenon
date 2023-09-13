<template>
  <span class="icon-wrapper">
    <component v-bind="iconConfig" :is="IconTypes[iconConfig.type]"></component>
  </span>
</template>
<script setup lang="ts">
import { IconTypes } from './material-dependency';

const props = defineProps<{
  iconConfig: {
    type: string;
  },
}>();

</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>