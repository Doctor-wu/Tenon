<template>
  <a-avatar v-bind="$props">
    {{textValue}}
    <template v-if="withIcon" #trigger-icon>
      <slot name="trigger-icon"></slot>
    </template>
  </a-avatar>
</template>
<script setup lang="ts">
const props = defineProps({
  withIcon: Boolean,
  textValue: String,
});

</script>

<style lang="scss" scoped>
</style>