<template>
  <div>
    Block
    <slot />
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  config: {
    type: Object,
    default: () => []
  },
});

</script>
<style lang="scss">
</style>