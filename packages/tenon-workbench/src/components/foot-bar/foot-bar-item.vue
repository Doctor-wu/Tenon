<template>
  <component v-if="config.render" :is="config.render"></component>
  <Popup v-else theme="light" :content="config.popupText" ref="popupRef" :show-arrow="false"
    placement="bottom-right" :overlayInnerStyle="{padding: '3px 6px'}">
    <Button variant="text" @click="(...args) => emitAction(...args)">
      <component v-if="config.icon?.iconRender" :is="config.icon?.iconRender"></component>
      <Icon v-else-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></Icon>
      <span class="item-text" v-if="config.text"> {{config.text}} </span>
    </Button>
  </Popup>
</template>
<script setup lang="ts">
import { Popup, Button, Icon } from "tdesign-vue-next";
import { inject, ref } from "vue";
import { FootBarItemType } from "../../configs";
import { WorkbenchType } from "../../core";
import { ActionType } from "../../decorators";
import { InternalUIService } from "../../services";

const { config } = defineProps<{
  config: FootBarItemType;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const emitAction = (...args) => {
  let action: ActionType | undefined;
  action = ActionType.onClick;
  if (!action) return;
  barConfig?.emitAction(config.name, action, InternalUIService.FootBar);
};

</script>
<style lang="scss" scoped>
.t-button--variant-text {
  padding: 0;
  height: 24px;
  // min-width: 30px;
  cursor: unset;
}

::v-deep(.t-button__text) {
  display: flex;
  align-items: center;
}

.popup-visible {
  background-color: #f1f1f1;
}
</style>
