<template>
  <section class="viewer-container">
    <ComposeView :config="store.getters['viewer/getTree']"></ComposeView>
  </section>
</template>
<script setup lang="ts">
import { useStore } from '../store';
import ComposeView from '../components/viewer/ComposeView.vue';

const store = useStore();
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