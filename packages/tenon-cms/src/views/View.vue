<template>
  <section class="viewer-container" draggable="false">
    <section class="viewer-nav">
      <ViewerNav></ViewerNav>
    </section>
    <section class="viewer-panel" :class="[editMode ? 'editMode' : '']" ref="panel">
      <ComposeView :config="store.getters['viewer/getTree']" class="rootView"></ComposeView>
    </section>
    <section class="viewer-notice">
      <ViewerNotice></ViewerNotice>
    </section>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '../store';
import ViewerNav from '../components/viewer/viewer-nav.vue';
import ComposeView from '../materials/base/Compose-View/Compose-View.vue';
import ViewerNotice from '../components/viewer/viewer-notice.vue';
import { editMode } from '../logic/viewer-status';

const store = useStore();
const panel = ref<HTMLElement>();

onMounted(() => {
  panel.value?.scrollIntoView();
});

</script>
<style lang="scss" scoped>
.rootView {
  transform: scale(1);
}
.viewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0;
  box-sizing: border-box;
  position: relative;
}

.viewer-panel {
  margin: 20px 20px 20px 20px;
  box-shadow: 0 3px 18px 8px #00000010;
  height: 1080px;
  width: 1920px;
  overflow: auto;
  &.editMode {
    transform: scale(0.7);
    padding: 5px;
  }
}
.viewer-nav {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  padding-bottom: 3px;
  background-color: #fff;
}

.viewer-notice {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  height: 40px;
}
</style>