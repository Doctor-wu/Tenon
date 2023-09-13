<template>
  <SelectEventModal ref="eventSelector" @choose="handleSelectEvent"></SelectEventModal>
  <template v-for="eventsKey in Object.keys(activeComponent.events)" :key="eventsKey">
    <AddHandlers
      style="margin-top: 12px;"
      :eventConfig="activeComponent.events[eventsKey]!"
      :eventsKey="eventsKey"
      :eventSelector="$refs.selectEventModal"
      @doSelect="doSelect"
    ></AddHandlers>
  </template>
</template>
<script lang="ts" setup>
import SelectEventModal from './select-event-modal.vue';
import AddHandlers from './add-handlers.vue';
import { computed, ref } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const activeComponent = computed(() => store.getters['viewer/getActiveComponent']);

const eventSelector = ref<any>(null);

const handleSelectEvent = (evt: any) => {
  selecting?.handleAddEvent(evt);
}

let selecting: {
  handleAddEvent: Function
} | null = null;

const doSelect = (value: any) => {
  selecting = value;
  eventSelector.value!.openModal();
}
</script>
<style lang="scss" scoped>
</style>