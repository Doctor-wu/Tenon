<template>
  <section class="event-form-container">
    <a-form ref="form" :model="eventData">
      <a-form-item
        field="eventName"
        label="事件名称:"
        :rules="rules.eventName"
        :validate-trigger="['blur']"
      >
        <a-input v-model="eventData.eventName" placeholder="请输入事件名称" />
      </a-form-item>
      <a-alert title="作用域变量注入">
        <section>
          <b>$pageState</b>: 可以通过$state获取页面的状态
        </section>
        <section>
          <b>$comp</b>: 可以通过$comp获取组件实例，可以从中获取组件状态和组件props，也可以调用组件的一些内部方法
        </section>
        <section>
          <b>$events</b>: 可以通过$events获取页面的事件
        </section>
        <section>
          <b>$router</b>: 可以通过$router路由页面
        </section>
      </a-alert>
      <section class="code-mirror-block">
        <!-- <CodeMirrorEditor v-model="eventData.content"></CodeMirrorEditor> -->
        <MonacaEditor v-model="eventData.content"></MonacaEditor>
      </section>
      <a-button @click="submitEvent" type="primary">提交</a-button>
    </a-form>
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import MonacaEditor from '@/components/web-code/MonacaEditor.vue';
import { Message } from '@arco-design/web-vue';
import { addTenonEventApi, updateTenonEventApi } from '@/api';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash';
const store = useStore();

const $emit = defineEmits(['onAddEvent', 'onUpdateEvent']);

const form = ref();
const props = defineProps<{
  eventInfo: {
    _new?: boolean;
    eventName?: string;
    content?: string;
    gather?: string;
    _id?: string;
  }
}>();

const eventData = ref<{
  _new?: boolean;
  eventName?: string;
  content?: string;
  gather?: string;
}>({});

watch(props, () => {
  eventData.value = cloneDeep(props.eventInfo);
}, { immediate: true });

const rules = {
  eventName: [
    { required: true, type: 'string' }
  ],
  content: [],
  gather: [],
}

function submitEvent() {
  form.value.validate(async (error) => {
    if (error) {
      return Object.keys(error).forEach(key => {
        Message.error(error[key]);
      });
    }
    const pageInfo = await store.getters['page/getPageInfo']

    if (props.eventInfo._new) {
      const params: any = Object.assign({}, eventData.value);
      delete params._new;
      params.pageId = pageInfo._id;
      addTenonEventApi(params).then(({
        success, errorMsg, data
      }) => {
        if (!success) {
          return Message.error(errorMsg!);
        }
        $emit('onAddEvent');
        Message.success('新建事件成功');
      })
    } else {
      const params = Object.assign({}, eventData.value);
      updateTenonEventApi(params).then(({
        success, errorMsg, data
      }) => {
        if (!success) {
          return Message.error(errorMsg!);
        }
        $emit('onUpdateEvent');
        Message.success(data);
      })
    }
  })

}

</script>
<style lang="scss" scoped>
.event-form-container {
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
}

.code-mirror-block {
  margin-top: 20px;
}
</style>