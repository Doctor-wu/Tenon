<template>
  <section id="workbench-root">
    <HeaderBar :config="headerBarConfig"></HeaderBar>
    <ToolBar :config="toolBarConfig"></ToolBar>
    <section class="editor-container">
      <SurfaceLayer></SurfaceLayer>
      <BaseDrawer alignment="left"></BaseDrawer>
      <section ref="editorRoot" id="editor-root"></section>
      <BaseDrawer alignment="right"></BaseDrawer>
    </section>
    <FootBar :config="footBarConfig"></FootBar>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, provide, ref } from "vue";
import HeaderBar from "./header-bar/header-bar.vue";
import ToolBar from "./tool-bar/tool-bar.vue";
import FootBar from "./foot-bar/foot-bar.vue";
import { WorkbenchEvents, WorkbenchType } from "../core";
import { FootBarConfig, HeaderBarConfig } from "../interfaces";
import { ToolBarConfig } from "../interfaces/tool-bar-config";
import SurfaceLayer from "./surface-layer.vue";
import BaseDrawer from "./drawer/base-drawer.vue";
const editorRoot = ref(null);
const { workbenchInstance } = defineProps<{
  workbenchInstance: WorkbenchType;
  headerBarConfig: HeaderBarConfig;
  toolBarConfig: ToolBarConfig;
  footBarConfig: FootBarConfig;
}>();

provide("workbench", workbenchInstance);

onMounted(() => {
  workbenchInstance.eventEmitter.emit(WorkbenchEvents.EditorRootMount, editorRoot.value);
});
</script>
<style lang="scss" scoped>
#workbench-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
}
#editor-root {
  height: 100%;
  flex: 1;
}
.editor-container {
  flex: 1;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  z-index: 1;
}
</style>
