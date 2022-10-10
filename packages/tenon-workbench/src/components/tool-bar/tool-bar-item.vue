<template>
  <section class="toolbar-item-container">
    <Popup :overlayInnerStyle="{padding: '6px 0'}" trigger="click" ref="popupRef"
      v-if="config.flag === ToolBarFlag.DropDown && config.listTree" :show-arrow="false" theme="light"
      placement="bottom">
      <Button :onClick="(...args) => emitAction(...args)" variant="text" :disabled="config.disabled">
        <component v-if="config.icon?.iconRender" :is="config.icon?.iconRender"></component>
        <Icon v-else-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></Icon>
        <span class="item-text" v-if="config.text"> {{config.text}} </span>
        <Icon class="dropdown-arrow" v-if="config.flag === ToolBarFlag.DropDown" name="caret-down-small"></Icon>
      </Button>
      <template #content>
        <ListTree :from="InternalUIService.ToolBar" :list="config.listTree" :width="config.dropDownWidth || '90px'"
          @click="handleListTreeClick">
        </ListTree>
      </template>
    </Popup>
    <Button :onClick="(...args) => emitAction(...args)" variant="text" :disabled="config.disabled"
      :class="{active: (config.flag === ToolBarFlag.Switch && !!config.active)}" v-else>
      <component v-if="config.icon?.iconRender" :is="config.icon?.iconRender"></component>
      <Icon v-else-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></Icon>
      <span class="item-text" v-if="config.text"> {{config.text}} </span>
      <Icon class="dropdown-arrow" v-if="config.flag === ToolBarFlag.DropDown" name="caret-down-small"></Icon>
    </Button>
  </section>
</template>
<script setup lang="ts">
import { Button, Icon, Popup } from 'tdesign-vue-next';
import { inject, ref } from 'vue';
import { ToolBarConfigType, ToolBarFlag } from '../../configs/tool-bar-config';
import { WorkbenchType } from '../../core';
import { ActionType } from '../../decorators';
import { InternalUIService } from '../../services';
import ListTree from '../list-tree.vue';

const props = defineProps<{
  config: ToolBarConfigType;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const popupRef = ref<any>(null);

const emitAction = (...args) => {
  let action: ActionType | undefined;
  if (props.config.flag === ToolBarFlag.Button) action = ActionType.onClick;
  if (props.config.flag === ToolBarFlag.Switch) {
    if (props.config.active) {
      action = ActionType.onDeActive;
    } else {
      action = ActionType.onActive;
    }
    barConfig?.updateToolBarConfig(props.config.name, {
      active: !props.config.active,
    });
  }
  if (!action) return;
  barConfig?.emitAction(props.config.name, action, InternalUIService.ToolBar);
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

  .t-button__text {
    display: flex;
    align-items: center;
  }

  &.active {
    background-color: #44444416;
  }
}


::v-deep(.list-container) {
  width: auto;
}

.toolbar-item-container {
  display: inline-flex;
}

.dropdown-arrow {
  color: #3d3d3d;
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