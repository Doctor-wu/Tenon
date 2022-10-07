<template>
  <HeaderBar :config="headerBarConfig"></HeaderBar>
  <ToolBar :config="toolBarConfig"></ToolBar>
  <section ref="editorRoot" id="editor-root"></section>
  <FootBar></FootBar>
</template>
<script setup lang="ts">
import HeaderBar from './header-bar/header-bar.vue';
import ToolBar from './tool-bar/tool-bar.vue';
import FootBar from './foot-bar.vue';
import { onMounted, provide, ref } from 'vue';
import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchEvents } from '../core';
import { HeaderBarConfig } from '../configs';
import { ToolBarConfig } from '../configs/tool-bar-config';
const editorRoot = ref(null);
const {
  workbenchInstance,
} = defineProps<{
  workbenchInstance: IWorkbenchAdapter & WorkbenchLoader;
  headerBarConfig: HeaderBarConfig;
  toolBarConfig: ToolBarConfig;
}>();

provide('workbench', workbenchInstance);

onMounted(() => {
  workbenchInstance.eventEmitter.emit(
    WorkbenchEvents.EditorRootMount,
    editorRoot.value,
  );
});

</script>
<style lang="scss" scoped>
  
</style>