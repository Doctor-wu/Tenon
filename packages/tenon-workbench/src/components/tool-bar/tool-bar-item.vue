<template>
  <section class="toolbar-item-container">
    <Popup :overlayInnerStyle="{padding: '6px 0'}" trigger="click" ref="popupRef" v-if="config.listTree" :show-arrow="false"
      theme="light" placement="bottom">
      <Button :onClick="(...args) => emitAction(ActionType.onClick, ...args)" variant="text"
        :disabled="config.disabled">
        <Icon v-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></Icon>
        <span class="item-text" v-if="config.text"> {{config.text}} </span>
        <Icon v-if="config.flag & ToolBarFlag.DropDown" name="caret-down-small"></Icon>
      </Button>
      <template #content>
        <ListTree :list="config.listTree" :width="config.dropDownWidth || '90px'" @click="handleListTreeClick"></ListTree>
      </template>
    </Popup>
    <Button :onClick="(...args) => emitAction(ActionType.onClick, ...args)" variant="text" :disabled="config.disabled"
      v-else>
      <Icon class="toolbar-icon" v-if="config.icon" :name="config.icon.iconName"
        :size="(config.icon.iconSize || 16) + 'px'"></Icon>
      <span class="item-text" v-if="config.text"> {{config.text}} </span>
      <Icon v-if="config.flag & ToolBarFlag.DropDown" name="caret-down-small"></Icon>
    </Button>
  </section>
</template>
<script setup lang="ts">
import { Button, Icon, Popup } from 'tdesign-vue-next';
import { inject, ref } from 'vue';
import { ToolBarConfigType, ToolBarFlag } from '../../configs/tool-bar-config';
import { WorkbenchType } from '../../core';
import { ActionType } from '../../decorators';
import ListTree from '../list-tree.vue';

const props = defineProps<{
  config: ToolBarConfigType;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const popupRef = ref<any>(null);

const emitAction = (action: ActionType, ...args) => {
  if (!(props.config.flag & ToolBarFlag.Button)) return;
  barConfig?.emitAction(props.config.name, action, ...args);
};

const handleListTreeClick = () => {
  popupRef.value?.handleClose();
};

</script>
<style lang="scss" scoped>
::v-deep(.t-button--variant-text) {
  // padding: 3px 6px;
  padding: 0;
  height: 30px;
  min-width: 30px;
  cursor: unset;
}

::v-deep(.list-container) {
  width: auto;
}

.toolbar-item-container {
  display: inline-flex;
}

.item-text {
  font-size: 13px;
  vertical-align: middle;
  padding: 0 3px;
}

.toolbar-icon {
  padding: 0 3px;
}
</style>