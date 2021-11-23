<template>
  <section class="comp-instance-attr-container">
    <a-empty v-if="activeComponent?.material?.config.setup === 'native'">该组件为内部组件</a-empty>
    <template v-else>
      <pre>{{ JSON.stringify(activeComponent.states, null, 2) }}</pre>
    </template>
  </section>
</template>
<script setup lang="ts">
import { useStore } from '../../../store';
import { computed } from 'vue';
import { ComponentTreeNode } from '../../../store/modules/viewer';

const store = useStore();
const activeComponent = computed<ComponentTreeNode>(() => store.getters['viewer/getActiveComponent']);
console.log(activeComponent.value);

</script>
<style lang="scss" scoped>
</style>