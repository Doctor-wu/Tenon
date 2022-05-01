<template>
  <section
    class="wrapper-container"
    v-if="shouldRender"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { TenonComponent } from '@tenon/engine';

const props = defineProps<{
  tenonComp: TenonComponent
}>();

const shouldRender = computed(() => {
  if(props.tenonComp.name !== 'If') return true;
  if(!props.tenonComp.props.IfConfig.render) return false;
  return true;
});


</script>
<style lang="scss" scoped>
.wrapper-container {
}
</style>