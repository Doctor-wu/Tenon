<template>
  <a-modal
    v-model:visible="visible"
    @beforeOk="handleBeforeOk"
    @beforeClose="handleBeforeClose"
    @ok="handleOk"
    :title="openByEdit ? '修改表格数据' : '添加表格数据'"
  >
    <section class="kv-wrapper">
      <a-row style="margin: 12px 0" :gutter="12" v-for="(row, index) in beAdded">
        <a-col :span="10">
          <a-input v-model="row.key" placeholder="key"></a-input>
        </a-col>
        <a-col :span="10">
          <a-input v-model="row.value" placeholder="value"></a-input>
        </a-col>
        <a-col :span="4">
          <a-button @click="() => deleteRow(index)" status="danger" type="primary" long>删除</a-button>
        </a-col>
      </a-row>
      <a-row style="margin: 12px 0" :gutter="12">
        <a-col :span="10">
          <a-input v-model="addingKey" placeholder="key"></a-input>
        </a-col>
        <a-col :span="10">
          <a-input v-model="addingValue" placeholder="value"></a-input>
        </a-col>
        <a-col :span="4">
          <a-button :disabled="!addingKey" @click="addData" type="primary" long>增加</a-button>
        </a-col>
      </a-row>
    </section>
  </a-modal>
  <a-button style="margin-bottom: 12px" @click="openModal" type="dashed" long>
    <icon-plus-circle></icon-plus-circle>添加数据
  </a-button>
</template>

<script setup lang="ts">
import { assign, cloneDeep } from 'lodash';
import { nextTick, reactive, ref } from 'vue';

const $emit = defineEmits(['addData', 'updateData']);
const props = defineProps();

const visible = ref(false);
const beAdded = ref<{ key: string; value: string; }[]>([]);
const addingKey = ref('');
const addingValue = ref('');
const openByEdit = ref(false);
let editIndex = -1;

const openModal = () => {
  visible.value = true;
};

const addData = () => {
  beAdded.value.push({
    key: addingKey.value,
    value: addingValue.value,
  });
  addingKey.value = '';
  addingValue.value = '';
}

const deleteRow = (index) => {
  beAdded.value.splice(index, 1);
}

const handleOk = () => {
  if (!beAdded.value.length) return $emit('addData', {});
  const result = {};
  beAdded.value.forEach(({ key, value }) => {
    result[key] = value;
  });
  if (openByEdit.value) {
    $emit('updateData', editIndex, result);
  } else {
    $emit('addData', result);
  }
}

const handleBeforeOk = (done) => {
  return true;
}

const handleBeforeClose = () => {
  beAdded.value.length = 0;
  addingKey.value = '';
  addingValue.value = '';
  openByEdit.value = false;
  return true;
}

const edit = (index, data) => {
  editIndex = index;
  openByEdit.value = true;
  nextTick(() => {
    Object.keys(data).forEach(key => {
      beAdded.value.push({
        key,
        value: data[key],
      });
      visible.value = true;
    });
  });
}


defineExpose({
  edit,
});
</script>
<style lang="scss" scoped>
</style>