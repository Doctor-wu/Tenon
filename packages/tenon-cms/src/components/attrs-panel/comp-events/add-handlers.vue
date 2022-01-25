<template>
  <a-card :title="eventConfig.eventLabel">
    <div class="stock-handler" v-for="(item, index) in eventConfig.executeQueue">
      <b>{{ item.eventName.toUpperCase() }}</b>
      <b>
        {{ item.tenonCompName }}_{{ item.tenonCompID }}
        <icon-delete @click="() => deleteStockHandler(index)" class="delete-stock-handler" />
      </b>
    </div>
    <a-button @click="addHandler" style="margin-bottom: 10px" type="dashed" long>
      <icon-plus></icon-plus>添加Handlers
    </a-button>
  </a-card>
</template>
<script setup lang="ts">import { computed } from 'vue';
import { IEventStruct, IHandlerConfig } from '../../../logic/events';
import { useStore } from '../../../store';
import { ComponentTreeNode } from '../../../store/modules/viewer';

const store = useStore();
const activeComponent = computed<ComponentTreeNode>(() => store.getters['viewer/getActiveComponent']);

interface propsType {
  eventConfig: IEventStruct;
  eventsKey: string;
}
const props = defineProps<propsType>();

const emit = defineEmits(['doSelect']);

const addHandler = () => {
  emit('doSelect', {
    handleAddEvent,
  });
};

const deleteStockHandler = (index: number) => {
  (activeComponent.value.events[props.eventsKey] as IEventStruct).executeQueue.splice(index, 1);
}

const handleAddEvent = (handler: IHandlerConfig) => {
  if (!handler) return;
  (activeComponent.value.events[props.eventsKey] as IEventStruct).executeQueue.push({
    eventName: handler.eventName,
    tenonCompID: handler.tenonComp.id,
    tenonCompName: handler.tenonComp.name,
  });
};
</script>
<style lang="scss" scoped>
.stock-handler {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  & + .stock-handler {
    border-top: 1px dashed #e3e3e3;
  }
}

.delete-stock-handler {
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
</style>