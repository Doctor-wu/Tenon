<template>
  <component v-if="operateConfig.render" :is="operateConfig.render"></component>
  <TPopup
    v-else-if="!operateConfig.listTree"
    :content="operateConfig.popupText"
    :show-arrow="false"
    theme="light"
    placement="bottom"
  >
    <TButton
      :onClick="handleButtonClick"
      variant="text"
      :aria-label="operateConfig.name"
      :disabled="operateConfig.disabled"
    >
      <component
        v-if="operateConfig.icon?.iconRender"
        :is="operateConfig.icon?.iconRender"
      ></component>
      <TIcon
        v-else-if="operateConfig.icon"
        :name="operateConfig.icon.iconName"
        :size="(operateConfig.icon.iconSize || 24) + 'px'"
      ></TIcon>
    </TButton>
  </TPopup>
  <TPopup
    v-else
    theme="light"
    trigger="click"
    :show-arrow="false"
    placement="bottom-right"
    :overlayInnerStyle="{ padding: '6px 0', borderRadius: 0 }"
    :visible="visible"
  >
    <TButton
      variant="text"
      :aria-label="operateConfig.name"
      :disabled="operateConfig.disabled"
      :onClick="handleButtonClick"
    >
      <component
        v-if="operateConfig.icon?.iconRender"
        :is="operateConfig.icon?.iconRender"
      ></component>
      <TIcon
        v-else-if="operateConfig.icon"
        :name="operateConfig.icon.iconName"
        :size="(operateConfig.icon.iconSize || 24) + 'px'"
      ></TIcon>
    </TButton>
    <template #content>
      <ListTree
        :from="InternalUIService.HeaderBar"
        :list="operateConfig.listTree"
        @click="handleListTreeClick"
        :visible="visible"
      ></ListTree>
    </template>
  </TPopup>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import { HeaderBarType, IHeaderBarOperatorItem } from '../../interfaces'
import { WorkbenchType } from '../../core'
import { ActionType } from '../../decorators'
import { InternalUIService } from '../../services'
import ListTree from '../list-tree.vue'
import {
  useClickOutSide,
  getClickOutSideByParentClassName,
} from '../../hooks/useClickOutSide'

const { operateConfig } = defineProps<{
  operateConfig: IHeaderBarOperatorItem
}>()

const workbench = inject<WorkbenchType>('workbench')
const barConfig = workbench?.barConfig

const visible = ref(false)

let clickOutSideController: AbortController | undefined

const emitAction = (...args) => {
  let action: ActionType | undefined
  if (operateConfig.type === HeaderBarType.Operator) action = ActionType.onClick
  if (!action) return
  barConfig?.emitAction(operateConfig.name, action, InternalUIService.HeaderBar)
}

const handleButtonClick = (...args) => {
  visible.value = true
  setTimeout(() => {
    clickOutSideController = useClickOutSide(
      getClickOutSideByParentClassName('workbench-list-tree-container'),
      () => {
        visible.value = false
        clickOutSideController = undefined
      },
    )
  }, 50)
  emitAction(...args)
}

const handleListTreeClick = () => {
  visible.value = false
  if (clickOutSideController) {
    clickOutSideController.abort()
    clickOutSideController = undefined
  }
}
</script>
<style lang="scss" scoped>
.t-button--variant-text {
  padding: 0;
  height: 30px;
  width: 30px;
  cursor: unset;
}

.popup-visible {
  background-color: #f1f1f1;
}
</style>
