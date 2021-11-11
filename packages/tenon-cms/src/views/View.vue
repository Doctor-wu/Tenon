<template>
  <section class="viewer-container">
    <component
      :is="toRaw(map.get('Compose-View')().component)"
      :config="store.getters['viewer/getTree']"
    ></component>
  </section>
</template>
<script setup lang="ts">
import { toRaw } from 'vue';
import { useStore } from '../store';

const store = useStore();
const map = store.getters['materials/getMaterialsMap'];
store.dispatch('viewer/setTree', {
  name: 'Compose-View',
  id: 0,
  children: [],
})
</script>
<style lang="scss" scoped>
.viewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}
</style>