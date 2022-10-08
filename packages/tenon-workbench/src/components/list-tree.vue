<template>
  <section :style="props.width ? {width: props.width} : {}" class="list-container">
    <template v-for="(item) in props.list" :key="item.name">
      <template v-if="!item.hidden">
        <component v-if="item.render" :is="item.render" :config="item"></component>
        <section v-else-if="!item.children" class="list-item" :class="{disabled: item.disabled}"
          @click="(...args) => !item.disabled && emitAction(ActionType.onClick, item.name, ...args)">
          <span> {{item.text}} </span>
        </section>
        <Popup v-else placement="left-bottom" :ref="el => popups.push(el)" :overlayInnerStyle="{padding: '6px 0', borderRadius: 0}">
          <section class="list-item sub-root" :class="{disabled: item.disabled}"
            @click="(...args) => !item.disabled && emitAction(ActionType.onClick, item.name, ...args)">
            <span> {{item.text}} </span>
            <Icon class="sub-root-icon" name="caret-right-small"></Icon>
          </section>
          <template #content>
            <ListTree :list="item.children" @click="emitClick"></ListTree>
          </template>
        </Popup>
      </template>
    </template>
  </section>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue';
import { Icon, Popup } from 'tdesign-vue-next';
import { IListTree } from '../configs';
import { WorkbenchType } from '../core';
import { ActionType } from '../decorators';

const props = defineProps<{
  list: IListTree[],
  width?: string;
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const $emit = defineEmits(['click']);

const emitAction = (action: ActionType, name: any, ...args) => {
  if (action === ActionType.onClick) {
    emitClick();
  }
  barConfig?.emitAction(name, action, ...args);
};

const popups = ref<any>([]);

const emitClick = () => {
  popups.value.forEach(popup => popup?.handleClose());
  $emit('click');
};

</script>

<script lang="ts">
export default {
  name: 'ListTree',
}
</script>
<style lang="scss" scoped>
.list-container {
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
</style>