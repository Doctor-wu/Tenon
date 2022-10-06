<template>
  <HeaderBar :config="headerBarConfig"></HeaderBar>
  <ToolBar></ToolBar>
  <section ref="editorRoot" id="editor-root"></section>
  <FootBar></FootBar>
</template>
<script setup lang="ts">
import HeaderBar from './header-bar.vue';
import ToolBar from './tool-bar.vue';
import FootBar from './foot-bar.vue';
import { onMounted, provide, ref } from 'vue';
import { IWorkbenchAdapter, WorkbenchLoader, WorkbenchEvents } from '../core';
import { HeaderBarConfig } from '../configs';
const editorRoot = ref(null);
const {
  workbenchInstance,
} = defineProps<{
  workbenchInstance: IWorkbenchAdapter & WorkbenchLoader;
  headerBarConfig: HeaderBarConfig;
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