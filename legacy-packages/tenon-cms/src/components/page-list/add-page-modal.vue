<template>
  <a-modal @close="handleClose" v-model:visible="visible">
    <template #title>新建页面</template>
    <a-form ref="form" :model="pageConfig">
      <a-form-item
        field="pageName"
        label="页面名称"
        :rules="rules.pageName"
        :validate-trigger="['blur']"
      >
        <a-input v-model="pageConfig.pageName" placeholder="请输入页面名称" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" :loading="loading" @click="handleOk">提交</a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import { addPageApi } from '@/api/page';
import { Message } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const $emit = defineEmits(['add']);

const visible = ref(false);
const pageConfig = reactive({
  pageName: '',
});
const form = ref();

const rules = {
  pageName: [
    { required: true, message: '请输入页面名称' }
  ],
}
const loading = ref(false);
const belongProjectId = useRouter().currentRoute.value.params.projectId;

const handleOk = async () => {
  const error = await form.value.validate();
  if (error) {
    const errorKeys = Object.keys(error);
    return errorKeys.forEach(key => {
      Message.error(error[key].message);
    });
  }
  loading.value = true;
  const response = await addPageApi({
    pageName: pageConfig.pageName,
    belongProjectId,
  });
  if (!response.success) {
    Message.error(response.errorMsg!);
  } else {
    Message.success(response.successText);
    visible.value = false;
    $emit('add');
  }
  loading.value = false;
}

const handleClose = () => {
  pageConfig.pageName = '';
}


const open = () => {
  visible.value = true;
}
defineExpose({
  open,
})
</script>
<style lang="scss" scoped>
</style>