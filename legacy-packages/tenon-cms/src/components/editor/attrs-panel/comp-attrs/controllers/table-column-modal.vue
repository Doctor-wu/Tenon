<template>
  <a-modal
    v-model:visible="visible"
    @beforeOk="handleBeforeOk"
    @beforeClose="handleBeforeClose"
    @ok="handleOk"
    @cancel="handleCancel"
    :title="openByEdit ? '修改表格列' : '添加表格列'"
  >
    <a-form ref="formRef" :model="form">
      <a-form-item field="dataIndex" label="字段索引" validate-trigger="input" required>
        <a-input v-model="form.dataIndex" placeholder="请输入字段索引..." />
        <template #extra>
          <div>新增表格列将展示对应索引的值</div>
        </template>
      </a-form-item>
      <a-form-item field="title" label="字段标题" validate-trigger="input" required>
        <a-input v-model="form.title" placeholder="请输入字段标题..." />
        <template #extra>
          <div>新增表格列的表头将为字段标题的值</div>
        </template>
      </a-form-item>
      <a-form-item field="width" label="列宽">
        <a-input type="number" v-model="form.width" placeholder="请输入列宽..." />
        <template #extra>
          <div>表格列宽度</div>
        </template>
      </a-form-item>
      <a-form-item field="width" label="对齐方式">
        <a-select v-model="form.align" placeholder="请选择对齐方式..." allow-clear>
          <a-option value="left">左</a-option>
          <a-option value="middle">中</a-option>
          <a-option value="right">右</a-option>
        </a-select>
        <template #extra>
          <div>表格列对齐方式</div>
        </template>
      </a-form-item>
      <a-form-item field="fixed" label="固定位置">
        <a-select v-model="form.fixed" placeholder="请选择固定位置..." allow-clear>
          <a-option value="left">左</a-option>
          <a-option value="right">右</a-option>
        </a-select>
        <template #extra>
          <div>表格列固定位置</div>
        </template>
      </a-form-item>
      <a-form-item field="fixed" label="省略号">
        <a-switch v-model="form.ellipsis"></a-switch>
        <template #extra>
          <div>数据超出列宽时是否显示省略号</div>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-button @click="openModal" type="dashed" long>
    <icon-plus-circle></icon-plus-circle>添加列
  </a-button>
</template>

<script setup lang="ts">
import { FormInstance } from '@arco-design/web-vue/es/form';
import { assign, cloneDeep } from 'lodash';
import { nextTick, reactive, ref } from 'vue';

const $emit = defineEmits(['addColumn', 'updateColumn']);
const props = defineProps<{
  preSource: any;
  editIndex: number;
}>();

const visible = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  dataIndex: '',
  title: '',
  width: undefined,
  align: undefined,
  fixed: undefined,
  ellipsis: false,
});
let openByEdit = ref(false);

const openModal = () => {
  visible.value = true;
  openByEdit.value = false;
};

const handleOk = () => {
  if (openByEdit.value) {
    $emit('updateColumn', props.editIndex, cloneDeep(form));
  } else {
    $emit('addColumn', cloneDeep(form));
  }
}

const handleCancel = () => {

}

const handleBeforeOk = (done) => {
  formRef.value?.validate((errors) => {
    if (!errors) return done(true);
    done(false);
  });
}

const handleBeforeClose = () => {
  formRef.value?.clearValidate();
  form.dataIndex = '';
  form.title = '';
  form.width = undefined;
  form.align = undefined;
  form.fixed = undefined;
  form.ellipsis = false;
  openByEdit.value = false;
}

const edit = () => {
  nextTick(() => {
    openByEdit.value = true;
    assign(form, props.preSource);
    visible.value = true;
  });
}


defineExpose({
  edit,
});
</script>
<style lang="scss" scoped>
</style>