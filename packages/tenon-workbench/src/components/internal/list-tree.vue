<template>
  <section class="list-container">
    <template v-for="item in (props.list as any)" :key="item.name">
      <template v-if="!item.hidden">
        <component v-if="item.render" :is="item.render"></component>
        <section
          v-else-if="!item.children" 
          class="list-item" 
          @click="(...args) => emitAction(ActionType.onClick, item.name, ...args)"
        >
          <span> {{item.text}} </span>
        </section>
        <Popup
          v-else
          placement="left-bottom"
          :overlayInnerStyle="{padding: '6px 0', borderRadius: 0}"
        >
          <section
            class="list-item sub-root"
            @click="(...args) => emitAction(ActionType.onClick, item.name, ...args)"
          >
            <span> {{item.text}} </span>
            <Icon class="sub-root-icon" name="caret-right-small"></Icon>
          </section>
          <template #content>
            <ListTree :list="item.children"></ListTree>
          </template>
        </Popup>
      </template>
    </template>
  </section>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { Icon, Popup } from 'tdesign-vue-next';
import { ActionType } from '../../decorators';
import { IListTree } from '../../configs';
import { WorkbenchType } from '../../core';

const props = defineProps<{
  list: IListTree[]
}>();

const workbench = inject<WorkbenchType>("workbench");
const barConfig = workbench?.barConfig;

const emitAction = (action: ActionType, name:any, ...args) => {
  barConfig?.emitAction(name, action, ...args);
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
}

.sub-root-icon {
  font-size: 16px;
  color: gray;
}
</style>