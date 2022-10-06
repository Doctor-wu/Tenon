<template>
  <component v-if="operateConfig.render" :is="operateConfig.render"></component>
  <Popup
    v-else
    :content="operateConfig.popupText"
    theme="light"
    :show-arrow="false"
    placement="bottom"
  >
    <Button
      :onClick="(...args) => emitAction(ActionType.onClick, ...args)"
      variant="text"
    >
      <Icon size="25px" :name="operateConfig.iconName"></Icon>
    </Button>
  </Popup>
</template>
<script setup lang="ts">
import { Popup, Button, Icon } from "tdesign-vue-next";
import { inject, VNode } from "vue";
import { IHeaderBarOperatorItem, WorkbenchType } from "../../core";
import { ActionType } from "../../decorators";

const { operateConfig } = defineProps<{
  operateConfig: IHeaderBarOperatorItem;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const emitAction = (action: ActionType, ...args) => {
  barConfig?.emitAction(operateConfig.name, action, ...args);
};
</script>
<style lang="scss" scoped>
.t-button--variant-text {
  padding: 0;
  height: 40px;
  width: 40px;
  cursor: unset;
}
</style>
