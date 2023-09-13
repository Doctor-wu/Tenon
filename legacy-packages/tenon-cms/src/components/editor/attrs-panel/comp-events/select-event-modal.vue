<template>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>选择处理事件</template>
    <div
      @click="() => selectHandler(item)"
      class="handler-item"
      :class="{ active: selectedHandler === item }"
      v-for="item in pageInfo?.events || []"
    >
      <b>{{ item.eventName.toUpperCase() }}</b>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { IPageState } from "@/store/modules/page";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["choose"]);
const store = useStore();

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

const pageInfo = ref<IPageState["pageInfo"]>();
watchEffect(async () => {
  pageInfo.value = await store.getters['page/getPageInfo'];
});


const selectedHandler = ref();

const selectHandler = (item) => {
  if (selectedHandler.value === item) return selectedHandler.value = null;
  selectedHandler.value = item;
}

defineExpose({
  openModal,
  closeModal,
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