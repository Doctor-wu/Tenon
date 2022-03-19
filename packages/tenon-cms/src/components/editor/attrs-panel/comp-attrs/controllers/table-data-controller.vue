<template>
  <section class="data-container">
    <TableDataModal ref="modal" @update-data="handleUpdateData" @add-data="handleAddData"></TableDataModal>
    <section class="data-item" v-for="(item, index) in modelValue">
      <a-divider v-if="index > 0"></a-divider>
      <a-descriptions :data="normalizeData(item)" :column="1" />
      <section class="item-op">
        <a-button @click="() => deleteData(index)" status="danger" style="padding:0 6px;">
          <icon-delete></icon-delete>删除
        </a-button>
        <a-button
          @click="() => editData(index)"
          status="success"
          style="padding:0 6px;margin-left: 12px;"
        >
          <icon-edit></icon-edit>修改
        </a-button>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TableDataModal from './table-data-modal.vue';
const $emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: any[];
}>();

const modal = ref<any>();

const handleAddData = (data) => {
  props.modelValue.push(data);
}

const deleteData = (index) => {
  props.modelValue.splice(index, 1);
}

const editData = (index) => {
  modal.value.edit(index, props.modelValue[index]);
}

const handleUpdateData = (index, data) => {
  props.modelValue[index] = data;
}

const normalizeData = (item) => {
  const data: any[] = [];
  Object.keys(item).forEach(key => {
    data.push({
      label: key,
      value: item[key],
    });
  });
  return data;
}

</script>
<style lang="scss" scoped>
.data-container {
  width: 100%;
}

.item-op {
  display: flex;
  justify-content: flex-end;
}
</style>