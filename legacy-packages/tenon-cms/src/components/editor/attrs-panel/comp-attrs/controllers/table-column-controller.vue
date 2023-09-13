<template>
  <section class="table-column-container">
    <EditTableColumnModal
      ref="modal"
      :edit-index="editIndex"
      :pre-source="editColumnValue"
      @add-column="handleAddColumn"
      @update-column="handleUpdateColumn"
    ></EditTableColumnModal>
    <section class="table-column-item" v-for="(item, index) in modelValue">
      <section class="item-info">{{ item.title }}-{{ item.dataIndex }}</section>
      <section class="item-op">
        <section class="delete-op" @click="() => deleteColumn(index)">
          <a-button status="danger" size="small" style="padding: 0 6px;">
            <icon-delete />
          </a-button>
        </section>
        <section class="update-op" @click="() => updateColumn(index)">
          <a-button status="success" size="small" style="padding: 0 6px;">
            <icon-edit />
          </a-button>
        </section>
        <section class="move-op">
          <a-button
            @click="() => moveColumnUp(index)"
            :disabled="index === 0"
            size="mini"
            type="text"
            style="height: 20px"
          >
            <icon-caret-up />
          </a-button>
          <a-button
            @click="() => moveColumnDown(index)"
            :disabled="index === modelValue.length - 1"
            size="mini"
            type="text"
            style="height: 20px"
          >
            <icon-caret-down />
          </a-button>
        </section>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import EditTableColumnModal from './table-column-modal.vue';

const props = defineProps<{
  modelValue: {
    dataIndex: string;
    title: string;
  }[];
}>();
const $emit = defineEmits(['update:modelValue']);

const editColumnValue = ref<any>(null);
const editIndex = ref(-1);
const modal = ref<any>();

const moveColumnUp = (index: number) => {
  [
    props.modelValue[index - 1],
    props.modelValue[index],
  ] = [
      props.modelValue[index],
      props.modelValue[index - 1],
    ];
  $emit("update:modelValue", cloneDeep(props.modelValue));
};
const moveColumnDown = (index: number) => {
  [
    props.modelValue[index + 1],
    props.modelValue[index],
  ] = [
      props.modelValue[index],
      props.modelValue[index + 1],
    ];
  $emit("update:modelValue", cloneDeep(props.modelValue));
};

const deleteColumn = (index: number) => {
  props.modelValue.splice(index, 1);
  $emit("update:modelValue", cloneDeep(props.modelValue));
};

const updateColumn = (index: number) => {
  editColumnValue.value = cloneDeep(props.modelValue[index]);
  editIndex.value = index;
  modal.value.edit();
};

const handleUpdateColumn = (index, column: any) => {
  props.modelValue[index] = column;
  $emit("update:modelValue", cloneDeep(props.modelValue));
};

const handleAddColumn = (column: any) => {
  props.modelValue.push(column);
  $emit("update:modelValue", cloneDeep(props.modelValue));
};

</script>
<style lang="scss" scoped>
.table-column-container {
  width: 100%;
}
.table-column-item {
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-op {
  display: flex;
  align-items: center;
  gap: 0 12px;

  .move-op {
    display: flex;
    flex-direction: column;
  }
}
</style>