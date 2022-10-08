<template>
  <component v-if="operateConfig.render" :is="operateConfig.render"></component>
  <Popup
    v-else-if="!operateConfig.listTree"
    :content="operateConfig.popupText"
    :show-arrow="false"
    theme="light"
    placement="bottom"
  >
    <Button
      :onClick="(...args) => emitAction(ActionType.onClick, ...args)"
      variant="text"
    >
      <Icon size="25px" :name="operateConfig.iconName"></Icon>
    </Button>
  </Popup>
  <Popup
    v-else
    theme="light"
    trigger="click"
    ref="popupRef"
    :show-arrow="false"
    placement="bottom-right"
    :overlayInnerStyle="{padding: '6px 0', borderRadius: 0}"
  >
    <Button
      variant="text"
    >
      <Icon size="25px" :name="operateConfig.iconName"></Icon>
    </Button>
    <template #content>
      <ListTree :list="operateConfig.listTree" @click="handleListTreeClick"></ListTree>
    </template>
  </Popup>
</template>
<script setup lang="ts">
import { Popup, Button, Icon } from "tdesign-vue-next";
import { inject, ref, VNode } from "vue";
import { IHeaderBarOperatorItem } from "../../configs";
import { WorkbenchType } from "../../core";
import { ActionType } from "../../decorators";
import ListTree from "../list-tree.vue";

const { operateConfig } = defineProps<{
  operateConfig: IHeaderBarOperatorItem;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const emitAction = (action: ActionType, ...args) => {
  barConfig?.emitAction(operateConfig.name, action, ...args);
};

// const popupVisible = ref(false);
// const togglePopupVisible = () => popupVisible.value = !popupVisible.value;
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
