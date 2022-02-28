<template>
  <span style="word-wrap:break-word;white-space:normal;" :style="textStyle">
    {{textValue.value}}
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
console.log(props);

</script>

<style lang="scss" scoped>
</style>