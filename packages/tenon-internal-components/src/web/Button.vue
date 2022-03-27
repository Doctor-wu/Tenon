<template>
  <a-button @click="handleClick" v-bind="$attrs">
    <slot></slot>
  </a-button>
</template>
<script setup lang="ts">
defineProps<{
  onClick: Function,
}>();

const handleClick = (...args) => {
  console.log(...args);
}
</script>

<style lang="scss" scoped>
</style>