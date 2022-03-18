<template>
  <a-modal
    v-model:visible="visible"
    @beforeOk="handleBeforeOk"
    @beforeClose="handleBeforeClose"
    @ok="handleOk"
    @cancel="handleCancel"
    title="添加表格列"
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
    </a-form>
  </a-modal>
  <a-button @click="openModal" type="dashed" long>
    <icon-plus-circle></icon-plus-circle>添加列
  </a-button>
</template>

<script setup lang="ts">
import { FormInstance } from '@arco-design/web-vue/es/form';
import { cloneDeep } from 'lodash';
import { reactive, ref } from 'vue';

const $emit = defineEmits(['addColumn']);

const visible = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  dataIndex: '',
  title: '',
});

const openModal = () => {
  visible.value = true;
};

const handleOk = () => {
  $emit('addColumn', cloneDeep(form));
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
}
</script>
<style lang="scss" scoped>
</style>