<template>
  <a-modal @close="handleClose" v-model:visible="visible">
    <template #title>新建项目</template>
    <a-form ref="form" :model="projectConfig">
      <a-form-item
        field="projectName"
        label="项目名称"
        :rules="rules.projectName"
        :validate-trigger="['blur']"
      >
        <a-input v-model="projectConfig.projectName" placeholder="请输入项目名称" />
      </a-form-item>
      <a-form-item field="userConfig.screenWidth" label="屏幕宽度" :validate-trigger="['blur']">
        <a-input type="number" v-model="projectConfig.userConfig.screenWidth" placeholder="请输入屏幕宽度" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" :loading="loading" @click="handleOk">提交</a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import { addProjectApi } from '@/api/project';
import { Message } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

const $emit = defineEmits(['add']);

const visible = ref(false);
const projectConfig = reactive({
  projectName: '',
  userConfig: {
    screenWidth: 360,
  }
});
const form = ref();

const rules = {
  projectName: [
    { required: true, message: '请输入项目名称' }
  ],
}
const loading = ref(false);

const handleOk = async () => {
  const error = await form.value.validate();
  if (error) {
    const errorKeys = Object.keys(error);
    return errorKeys.forEach(key => {
      Message.error(error[key].message);
    });
  }
  loading.value = true;
  const response = await addProjectApi(projectConfig);
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
  projectConfig.projectName = '';
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