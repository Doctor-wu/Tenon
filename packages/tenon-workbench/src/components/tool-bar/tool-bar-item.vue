<template>
  <section class="toolbar-item-container">
    <TPopup :overlayInnerStyle="{ padding: '6px 0' }" trigger="click" ref="popupRef"
      v-if="config.flag === ToolBarFlag.DropDown && config.listTree" :show-arrow="false" theme="light"
      placement="bottom">
      <TButton :onClick="(...args) => emitAction(...args)" variant="text" :disabled="config.disabled"
        :aria-label="config.name">
        <component v-if="config.icon?.iconRender" :is="config.icon?.iconRender"></component>
        <TIcon v-else-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></TIcon>
        <span class="item-text" v-if="config.text"> {{ config.text }} </span>
        <TIcon class="dropdown-arrow" v-if="config.flag === ToolBarFlag.DropDown" name="caret-down-small"></TIcon>
      </TButton>
      <template #content>
        <ListTree :from="InternalUIService.ToolBar" :list="config.listTree" :width="config.dropDownWidth || '90px'"
          @click="handleListTreeClick">
        </ListTree>
      </template>
    </TPopup>
    <TButton v-else :onClick="(...args) => emitAction(...args)" variant="text" :disabled="config.disabled"
      :aria-label="config.name" :class="{ active: (config.flag === ToolBarFlag.Switch && !!config.active) }">
      <component v-if="config.icon?.iconRender" :is="config.icon?.iconRender"></component>
      <TIcon v-else-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></TIcon>
      <span class="item-text" v-if="config.text"> {{ config.text }} </span>
      <TIcon class="dropdown-arrow" v-if="config.flag === ToolBarFlag.DropDown" name="caret-down-small"></TIcon>
    </TButton>
  </section>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue';
import { ToolBarItemType, ToolBarFlag } from '../../configs/tool-bar-config';
import { WorkbenchType } from '../../core';
import { ActionType } from '../../decorators';
import { InternalUIService } from '../../services';
import ListTree from '../list-tree.vue';

const props = defineProps<{
  config: ToolBarItemType;
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
@import "../../style/theme.scss";

::v-deep(.t-button--variant-text) {
  // padding: 3px 6px;
  padding: 0 3px;
  height: 30px;
  min-width: 30px;
  cursor: unset;

  .t-button__text {
    display: flex;
    align-items: center;
  }

  &.active {
    background-color: $tenon-hover-color;
    color: $tenon-primary-color;
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
