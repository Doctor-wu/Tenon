<template>
  <component v-if="operateConfig.render" :is="operateConfig.render"></component>
  <Popup
    v-else-if="!operateConfig.subConfigs"
    :content="operateConfig.popupText"
    theme="light"
    :show-arrow="false"
    placement="bottom"
  >
    <Button :onClick="(...args) =>emitAction('onClick', ...args)" variant="text">
      <Icon size="25px" :name="operateConfig.iconName"></Icon>
    </Button>
  </Popup>
  <Popup v-else>
    <template #content> tree </template>
  </Popup>
</template>
<script setup lang="ts">
import { Popup, Button, Icon } from "tdesign-vue-next";
import { inject, VNode } from "vue";
import { IHeaderBarOperatorItem, WorkbenchType } from "../../core";

const {
  operateConfig,
} = defineProps<{
  operateConfig: IHeaderBarOperatorItem;
}>();

console.log( operateConfig)

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const emitAction = (action: string, ...args) => {
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
