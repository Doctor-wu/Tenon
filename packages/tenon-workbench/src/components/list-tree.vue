<template>
  <section
    :style="props.width ? { width: props.width } : {}"
    class="workbench-list-tree-container"
    v-if="visible"
  >
    <template v-for="item in props.list" :key="item.name">
      <template v-if="!item.hidden">
        <component
          v-if="item.render"
          :is="item.render"
          :config="item"
        ></component>
        <section
          v-else-if="!item.children"
          class="list-item"
          :class="{ disabled: item.disabled }"
          @click="
            (...args) =>
              !item.disabled &&
              emitAction(ActionType.onClick, item.name, ...args)
          "
        >
          <section class="list-item-content">
            <component
              class="custom-icon"
              v-if="item.icon?.iconRender"
              :is="item.icon?.iconRender"
            ></component>
            <TIcon
              class="custom-icon"
              v-else-if="item.icon"
              :name="item.icon.iconName"
              :size="(item.icon.iconSize || 16) + 'px'"
            ></TIcon>
            <span>{{ item.text }}</span>
          </section>
        </section>
        <TPopup
          v-else
          placement="left-bottom"
          :overlayInnerStyle="{ padding: '6px 0', borderRadius: 0 }"
        >
          <section
            class="list-item sub-root"
            :class="{ disabled: item.disabled }"
            @click="
              (...args) =>
                !item.disabled &&
                emitAction(ActionType.onClick, item.name, ...args)
            "
          >
            <section class="list-item-content">
              <component
                class="custom-icon"
                v-if="item.icon?.iconRender"
                :is="item.icon?.iconRender"
              ></component>
              <TIcon
                class="custom-icon"
                v-else-if="item.icon"
                :name="item.icon.iconName"
                :size="(item.icon.iconSize || 16) + 'px'"
              ></TIcon>
              <span>{{ item.text }}</span>
            </section>
            <TIcon class="sub-root-icon" name="caret-right-small"></TIcon>
          </section>
          <template #content>
            <ListTree
              :visible="visible"
              :from="from"
              :list="item.children"
              @click="emitClick"
            ></ListTree>
          </template>
        </TPopup>
      </template>
    </template>
  </section>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { IListTree } from '../interfaces'
import { WorkbenchType } from '../core'
import { ActionType } from '../decorators'
import { InternalUIService } from '../services'

const props = defineProps<{
  list: IListTree[]
  width?: string
  from: InternalUIService
  visible?: boolean
}>()

const workbench = inject<WorkbenchType>('workbench')
const barConfig = workbench?.barConfig

const $emit = defineEmits(['click'])

const emitAction = (action: ActionType, name: any, ...args) => {
  if (action === ActionType.onClick) {
    emitClick(...args)
  }
  barConfig?.emitAction(name, action, props.from)
}

const emitClick = (...args) => {
  $emit('click', ...args)
}
</script>

<script lang="ts">
export default {
  name: 'ListTree',
}
</script>
<style lang="scss" scoped>
.workbench-list-tree-container {
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 99;
}

.list-item {
  width: 99%;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
  margin: 3px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;

  &:hover {
    background-color: #f8f8f8;
  }

  &.disabled {
    color: #d3d3d3;
    cursor: not-allowed;
  }
}

.sub-root-icon {
  font-size: 16px;
  color: gray;
}

.list-item-content {
  display: flex;
  align-items: center;
}

.custom-icon {
  margin-right: 5px;
}
</style>
