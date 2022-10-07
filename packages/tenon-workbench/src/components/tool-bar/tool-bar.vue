<template>
  <section :style="toolbarStyle" id="workbench-toolbar">
    <section class="toolbar-container">
      <template v-for="(group, index) in props.config.config" :key="index">
        <section class="toolbar-group">
          <template v-for="(item) in group" :key="item.name">
            <Popup v-if="item.popupText" :show-arrow="false" theme="light" placement="bottom">
              <ToolBarItem class="toolbar-item" :config="item"></ToolBarItem>
              <template #content>
                <span class="toolbar-item-popup">{{item.popupText}}</span>
              </template>
            </Popup>
            <ToolBarItem v-else class="toolbar-item" :config="item"></ToolBarItem>
          </template>
        </section>
        <Divider v-if="index !== props.config.config.length - 1" layout="vertical"></Divider>
      </template>
    </section>
  </section>
</template>
<script setup lang="ts">
import { Divider, Popup } from 'tdesign-vue-next';
import { ToolBarConfig } from '../../configs/tool-bar-config';
import ToolBarItem from './tool-bar-item.vue';

const props = defineProps<{
  config: ToolBarConfig,
}>();

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

const toolbarStyle = {
  justifyContent: alignmentMap[props.config.alignment],
};
</script>
<style lang="scss" scoped>
#workbench-toolbar {
  height: 50px;
  box-shadow: 0px 12px 55px #33333312;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 6px 12px;
  box-sizing: border-box;
}

.toolbar-container {
  display: flex;
  align-items: center;
}

.toolbar-group {
  margin: 6px 0;
}

.toolbar-item {
  margin: 0 3px;
}

.toolbar-item-popup {
  font-size: 12px;
  color: #3d3d3d;
}
</style>