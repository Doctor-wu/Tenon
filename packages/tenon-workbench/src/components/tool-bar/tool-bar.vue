<template>
  <section :style="toolbarStyle" id="workbench-toolbar">
    <section class="toolbar-container">
      <template v-for="(group, index) in props.config.config" :key="index">
        <template v-if="group.length">
          <section class="toolbar-group">
            <template v-for="(item) in group" :key="item.name">
              <template v-if="!item.hidden">
                <Popup v-if="item.popupText && (item.flag !== ToolBarFlag.DropDown || !item.listTree)"
                  :show-arrow="false" theme="light" placement="bottom">
                  <ToolBarItem class="toolbar-item" :config="item"></ToolBarItem>
                  <template #content>
                    <span class="toolbar-item-popup">{{item.popupText}}</span>
                  </template>
                </Popup>
                <ToolBarItem v-else class="toolbar-item" :config="item"></ToolBarItem>
              </template>
            </template>
          </section>
          <Divider v-if="!isLastNonEmptyGroup(group)"
            layout="vertical"></Divider>
        </template>
      </template>
    </section>
  </section>
</template>
<script setup lang="ts">
import { Divider, Popup } from 'tdesign-vue-next';
import { ToolBarConfig, ToolBarConfigType, ToolBarFlag } from '../../configs/tool-bar-config';
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

const isLastNonEmptyGroup = (group: ToolBarConfigType[]) => {
  for (let i = props.config.config.length -1; i >= 0; i --) {
    const groupItem = props.config.config[i];
    if (!groupItem.length) continue;
    return groupItem === group;
  };
  return true;
}

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
  transition: all ease .3s;
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