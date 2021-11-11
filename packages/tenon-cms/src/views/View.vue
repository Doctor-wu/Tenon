<template>
  <section class="viewer-container">
    <component
      :is="toRaw(store.getters['viewer/getTree'].component)"
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
  ...map.get('Compose-View'),
  children: [
    { ...map.get('Text') },
    { ...map.get('Block') },
    { ...map.get('Picture') },
    { ...map.get('Compose-View') }
  ],
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