<template>
  <section class="viewer-container" draggable="false">
    <section class="viewer-nav">
      <ViewerNav></ViewerNav>
    </section>
    <section class="viewer-panel">
      <component
        :is="toRaw(map.get('Compose-View')().component)"
        :config="store.getters['viewer/getTree']"
      ></component>
    </section>
  </section>
</template>
<script setup lang="ts">
import { toRaw } from 'vue';
import { useStore } from '../store';
import ViewerNav from '../components/viewer/viewer-nav.vue';

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
  padding: 0;
  box-sizing: border-box;
  position: relative;
  transform: translate(0, 0);
}

.viewer-panel {
  margin: 83px 20px 20px 20px;
  box-shadow: 0 3px 18px 8px #00000010;
}
.viewer-nav {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  padding-bottom: 3px;
  background-color: #fff;
}
</style>