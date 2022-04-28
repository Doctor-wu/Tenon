<template>
  <slot>{{ value }}</slot>
</template>
<script setup lang="ts">

defineProps<{
  value: string;
}>();

</script>

<style lang="scss" scoped>
</style>