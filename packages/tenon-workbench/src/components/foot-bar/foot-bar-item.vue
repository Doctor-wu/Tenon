<template>
  <component v-if="config.render" :is="config.render"></component>
  <TPopup v-else theme="light" :content="config.popupText" ref="popupRef" :show-arrow="false" placement="bottom-right"
    :overlayInnerStyle="{ padding: '3px 6px' }">
    <TButton variant="text" @click="(...args) => emitAction(...args)" :aria-label="config.name">
      <component v-if="config.icon?.iconRender" :is="config.icon?.iconRender"></component>
      <TIcon v-else-if="config.icon" :name="config.icon.iconName" :size="(config.icon.iconSize || 16) + 'px'"></TIcon>
      <span class="item-text" v-if="config.text"> {{ config.text }} </span>
    </TButton>
  </TPopup>
</template>
<script setup lang="ts">
import { inject } from "vue";
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
