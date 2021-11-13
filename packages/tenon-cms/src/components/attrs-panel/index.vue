<template>
  <section class="wrapper">
    <a-empty v-if="!activeComponent">未选中组件</a-empty>
    <section v-else>{{ activeComponent.name + '-' + activeComponent.id }}</section>
  </section>
</template>
<script setup lang="ts">
import { useStore } from '../../store';
import { computed } from 'vue';

const store = useStore();
const activeComponent = computed(() => store.getters['viewer/getActiveComponent']);

</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>

