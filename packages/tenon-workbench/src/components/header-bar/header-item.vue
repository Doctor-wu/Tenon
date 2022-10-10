<template>
  <component v-if="operateConfig.render" :is="operateConfig.render"></component>
  <Popup v-else-if="!operateConfig.listTree" :content="operateConfig.popupText" :show-arrow="false" theme="light"
    placement="bottom">
    <Button :onClick="(...args) => emitAction(...args)" variant="text">
      <Icon size="25px" :name="operateConfig.iconName"></Icon>
    </Button>
  </Popup>
  <Popup v-else theme="light" trigger="click" ref="popupRef" :show-arrow="false" placement="bottom-right"
    :overlayInnerStyle="{padding: '6px 0', borderRadius: 0}">
    <Button variant="text">
      <Icon size="25px" :name="operateConfig.iconName"></Icon>
    </Button>
    <template #content>
      <ListTree :from="InternalUIService.HeaderBar" :list="operateConfig.listTree" @click="handleListTreeClick">
      </ListTree>
    </template>
  </Popup>
</template>
<script setup lang="ts">
import { Popup, Button, Icon } from "tdesign-vue-next";
import { inject, ref, VNode } from "vue";
import { HeaderBarType, IHeaderBarOperatorItem } from "../../configs";
import { WorkbenchType } from "../../core";
import { ActionType } from "../../decorators";
import { InternalUIService } from "../../services";
import ListTree from "../list-tree.vue";

const { operateConfig } = defineProps<{
  operateConfig: IHeaderBarOperatorItem;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const emitAction = (...args) => {
  let action: ActionType | undefined;
  if (operateConfig.type === HeaderBarType.Operator) action = ActionType.onClick;
  if (!action) return;
  barConfig?.emitAction(operateConfig.name, action, InternalUIService.HeaderBar);
};

const popupRef = ref<any>(null);

const handleListTreeClick = () => {
  popupRef.value?.handleClose();
};
</script>
<style lang="scss" scoped>
.t-button--variant-text {
  padding: 0;
  height: 40px;
  width: 40px;
  cursor: unset;
}

.popup-visible {
  background-color: #f1f1f1;
}
</style>
