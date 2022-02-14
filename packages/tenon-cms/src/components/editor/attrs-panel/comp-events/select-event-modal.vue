<template>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      选择Handlers
      <small>(仅可选择自身或祖先的handlers)</small>
    </template>
    <div
      @click="() => selectHandler(item)"
      class="handler-item"
      :class="{ active: selectedHandler === item }"
      v-for="item in handlers"
    >
      <b>{{ item.eventName.toUpperCase() }}</b>
      <b>{{ item.tenonComp.name }}_{{ item.tenonComp.id }}</b>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { IHandlerConfig } from "../../../logic/events";

const emit = defineEmits(["choose"]);

const visible = ref(false);

const handleOk = () => {
  if (!selectedHandler.value) return;
  emit("choose", selectedHandler.value);
  selectedHandler.value = null;
};

const handleCancel = () => {
  closeModal();
  selectedHandler.value = null;
};

const openModal = () => visible.value = true;
const closeModal = () => visible.value = false;

const handlers = ref<IHandlerConfig[]>([]);

const setHandlers = (values: IHandlerConfig[]) => {
  handlers.value = values;
};

const selectedHandler = ref<IHandlerConfig | null>();

const selectHandler = (item: IHandlerConfig) => {
  if(selectedHandler.value === item) return selectedHandler.value = null;
  selectedHandler.value = item;
}

defineExpose({
  openModal,
  closeModal,
  setHandlers,
});
</script>
<style lang="scss" scoped>
.handler-item {
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  &:hover {
    cursor: pointer;
    background-color: #efefef;
  }
  &.active {
    background-color: #4883db;
    color: #eee;
  }
}
</style>