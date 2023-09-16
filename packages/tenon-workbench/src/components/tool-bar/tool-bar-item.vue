<template>
  <section class="toolbar-item-container">
    <TPopup
      :overlayInnerStyle="{ padding: '6px 0' }"
      trigger="click"
      v-if="config.flag === ToolBarFlag.DropDown"
      :show-arrow="false"
      theme="light"
      placement="bottom"
      :visible="visible"
    >
      <TButton
        :onClick="handleButtonClick"
        variant="text"
        :disabled="config.disabled"
        :aria-label="config.name"
        :style="[config.width ? { width: config.width } : {}]"
      >
        <IconRender
          v-if="config.icon"
          :icon="config.icon"
          :loading="config.loading"
        ></IconRender>
        <span class="item-text" v-if="config.text">{{ config.text }}</span>
        <TIcon
          class="dropdown-arrow"
          v-if="config.flag === ToolBarFlag.DropDown"
          name="caret-down-small"
        ></TIcon>
      </TButton>
      <template #content>
        <ListTree
          :from="InternalUIService.ToolBar"
          :list="config.listTree"
          :width="config.dropDownWidth || '90px'"
          :visible="visible"
          @click="handleListTreeClick"
        ></ListTree>
      </template>
    </TPopup>
    <TPopup v-else :show-arrow="false" theme="light" placement="bottom">
      <TButton
        :onClick="handleButtonClick"
        variant="text"
        :disabled="config.disabled"
        :aria-label="config.name"
        :class="{
          active: config.flag === ToolBarFlag.Switch && !!config.active,
        }"
        :style="[config.width ? { width: config.width } : {}, getSwitchStyle()]"
      >
        <IconRender
          v-if="config.icon"
          :icon="config.icon"
          :loading="config.loading"
        ></IconRender>
        <span class="item-text" v-if="config.text">{{ config.text }}</span>
      </TButton>
      <template v-if="config.popupText" #content>
        <span class="toolbar-item-popup">{{ getPopUpText(config) }}</span>
      </template>
    </TPopup>
  </section>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import { ToolBarItemType, ToolBarFlag } from "../../interfaces/tool-bar-config";
import { WorkbenchType } from "../../core";
import { ActionType } from "../../decorators";
import { InternalUIService } from "../../services";
import ListTree from "../list-tree.vue";
import { getClickOutSideByParentClassName, useClickOutSide } from "@tenon/shared";
import IconRender from "../icon-render.vue";

const props = defineProps<{
  config: ToolBarItemType;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const visible = ref(false);

let clickOutSideController: AbortController | undefined;

const emitAction = (...args) => {
  let action: ActionType | undefined;
  if (props.config.flag === ToolBarFlag.Button) action = ActionType.onClick;
  if (props.config.flag === ToolBarFlag.Switch) {
    if (props.config.active) {
      action = ActionType.onDeActive;
    } else {
      action = ActionType.onActive;
    }
    barConfig?.setSwitchActive(props.config.name, !props.config.active);
  }
  if (!action) return;
  barConfig?.emitAction(props.config.name, action, InternalUIService.ToolBar);
};

const handleButtonClick = (...args) => {
  if (props.config.flag === ToolBarFlag.DropDown) {
    visible.value = !visible.value;
    visible.value &&
      setTimeout(() => {
        clickOutSideController = useClickOutSide(
          getClickOutSideByParentClassName("workbench-list-tree-container"),
          () => {
            visible.value = false;
            clickOutSideController = undefined;
          }
        );
      });
  }
  emitAction(...args);
};

const handleListTreeClick = () => {
  visible.value = false;
  if (clickOutSideController) {
    clickOutSideController.abort();
    clickOutSideController = undefined;
  }
};

const getSwitchStyle = () => {
  if (props.config.flag === ToolBarFlag.Switch) {
    return [
      props.config.active ? props.config.activeStyle : props.config.deActiveStyle,
    ].filter(Boolean);
  }
  return [];
};

const getPopUpText = (config: any) => {
  if (config.popupText) {
    return typeof config.popupText === "string"
      ? config.popupText
      : config.popupText(config);
  }
  return undefined;
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
    background-color: $tenon-active-color;
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
