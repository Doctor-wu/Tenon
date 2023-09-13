<template>
  <a-modal
    width="568px"
    v-model:visible="visible"
    @before-ok="handleBeforeOk"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>管理页面生命周期</template>
    <template
      v-if="pageInfo"
      v-for="eventsKey in Object.keys(pageLifeCycle || {})"
      :key="eventsKey"
    >
      <AddHandlers
        style="margin-top: 12px;"
        :eventConfig="pageLifeCycle[eventsKey]!"
        :eventsKey="eventsKey"
        :eventSelector="$refs.selectEventModal"
        :deletor="deletor"
        @doSelect="doSelect"
      ></AddHandlers>
    </template>
  </a-modal>
  <SelectEventModal ref="eventSelector" @choose="handleSelectEvent"></SelectEventModal>
</template>
<script lang="ts" setup>
import AddHandlers from '@/components/editor/attrs-panel/comp-events//add-handlers.vue';
import SelectEventModal from '@/components/editor/attrs-panel/comp-events/select-event-modal.vue';
import { computed, ref, watchEffect } from 'vue';
import { useStore } from '@/store';
import { cloneDeep } from 'lodash';
import { updatePageLifeCycleApi } from '@/api';
import { Message } from '@arco-design/web-vue';

const store = useStore();
let pageInfo = ref();
let pageLifeCycle = ref();

watchEffect(async () => {
  pageInfo.value = await store.getters['page/getPageInfo'];
  pageLifeCycle.value = cloneDeep(pageInfo.value.pageLifeCycle);
});

const visible = ref(false);

const handleBeforeOk = async (done) => {
  const { success, errorMsg, data } = await updatePageLifeCycleApi({
    pageLifeCycle: pageLifeCycle.value,
    pageId: pageInfo.value._id,
  });
  if(!success) {
    Message.error(errorMsg!);
  } else {
    Message.success(data);
  }
  store.dispatch('page/updatePageInfo');
  done();
};

const handleOk = () => {

};

const handleCancel = () => {

};

const open = () => {
  visible.value = true;
}

const close = () => {
  visible.value = false;
}

const deletor = (eventsKey, index) => {
  pageLifeCycle.value[eventsKey].executeQueue.splice(index, 1);
}

const eventSelector = ref<any>(null);

const handleSelectEvent = (evt: any) => {
  pageLifeCycle.value[selectingKey!].executeQueue.push(evt._id);
}

let selectingKey: string | null = null;

const doSelect = ({ eventsKey }) => {
  selectingKey = eventsKey;
  eventSelector.value!.openModal();
}

defineExpose({
  open,
  close,
})
</script>
<style lang="scss" scoped>
</style>