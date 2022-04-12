<template>
  <a-modal
    :footer="false"
    width="568px"
    v-model:visible="visible"
    @ok="handleOk"
    @before-close="handleBeforeClose"
  >
    <template #title>页面状态管理</template>
    <a-table :columns="columns" :data="computedStates" />
  </a-modal>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const $emit = defineEmits([]);

const visible = ref(false);
const pageStates = ref<any>({});
let tid = 0;

const stopWatch = watchEffect(async () => {
  const pageInfo = await store.getters['page/getPageInfo'];
  pageStates.value = pageInfo.pageStates;
});

onUnmounted(() => {
  stopWatch();
});

const computedStates = computed(() => {
  return [ ...makeDataTree(pageStates.value), {
      data: 'extra',
      children: makeDataTree({
        username: 'doctorwu',
        age: 22,
        books: ['javascript', 'typescript'],
        company: {
          name: 'tencent',
          department: 'RDGZ',
        }
      }),
    }
  ]
});

const handleOk = () => {

};

const handleBeforeClose = () => {

};

const columns = [
  {
    title: '数据',
    dataIndex: 'data',
  },
];

const open = () => {
  visible.value = true;
};

const close = () => {
  visible.value = false;
}



function makeDataTree(data: Record<string, any>) {
  let result: any = [];
  Object.keys(data).forEach(key => {
    let node: any = {
      data: key,
      key: tid++,
    };
    if (data[key] && typeof data[key] === "object" && Object.keys(data[key]).length > 0) {
      node.children = makeDataTree(data[key]);
    } else {
      node.children = [{ data: data[key] }];
    }
    result.push(node);
  });

  return result;
}
defineExpose({ open, close });

</script>
<style lang="scss" scoped>
.modal-content-container {
  height: 568px;
  display: flex;
  flex-direction: column;

  .event-title-card {
    cursor: pointer;
  }

  .event-operate {
    display: flex;
    padding-bottom: 12px;
    margin-top: -6px;
    box-sizing: border-box;
  }

  .modal-content-wrapper {
    display: flex;
    height: 530px;
    border: 1px solid #e3e3e3;
  }

  .event-item {
    transition: all ease 0.3s;
    margin-bottom: 12px;
  }

  .event-item.active {
    box-shadow: 0px 0 28px -8px #4c8cec;
  }

  .empty-event,
  .empty-event-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .empty-event-info {
    height: 100%;
  }

  .empty-event,
  .event-list {
    width: 240px;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 6px;
    border-right: 1px solid #e3e3e3;
  }

  .event-info {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 6px;
  }

  .event-info-wrapper {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>