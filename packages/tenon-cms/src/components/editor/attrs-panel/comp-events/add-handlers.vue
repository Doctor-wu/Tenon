<template>
  <a-card :title="eventConfig.eventLabel">
    <div class="stock-handler" v-for="( id, index) in eventConfig.executeQueue">
      <b>{{ eventsMap.get(id)?.eventName }}</b>
      <b>
        <!-- {{ item.tenonCompName }}_{{ item.tenonCompID }} -->
        <icon-delete @click="() => deleteStockHandler(index)" class="delete-stock-handler" />
      </b>
    </div>
    <a-button @click="addHandler" style="margin-bottom: 10px" type="dashed" long>
      <icon-plus></icon-plus>添加处理事件
    </a-button>
  </a-card>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useStore } from '@/store';
import { TenonComponent, IEventStruct, IEventMeta } from '@tenon/engine';

interface propsType {
  eventConfig: IEventStruct;
  eventsKey: string;
  deletor?: any;
}

const store = useStore();
const activeComponent = computed<TenonComponent>(() => store.getters['viewer/getActiveComponent']);
const props = defineProps<propsType>();

const emit = defineEmits(['doSelect']);

const pageInfo = ref();
watchEffect(async () => {
  pageInfo.value = await store.getters['page/getPageInfo'];
});

const eventsMap = computed<Map<string, IEventMeta>>(() => {
  const map = new Map();
  pageInfo.value?.events.forEach((eventItem) => {
    map.set(eventItem._id, eventItem);
  });
  return map;
})

const addHandler = () => {
  emit('doSelect', {
    handleAddEvent,
    eventsKey: props.eventsKey
  });
};

const deleteStockHandler = (index: number) => {
  if (props.deletor) {
    props.deletor(props.eventsKey, index);
  } else {
    (activeComponent.value.events[props.eventsKey] as IEventStruct).executeQueue.splice(index, 1);
  }
}

const handleAddEvent = (eventItem: IEventMeta) => {
  if (!eventItem) return;
  (activeComponent.value.events[props.eventsKey] as IEventStruct).executeQueue.push(eventItem._id);
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