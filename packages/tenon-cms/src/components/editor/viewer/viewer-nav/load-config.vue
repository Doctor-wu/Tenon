<template>
  <AnimateButton info="读取页面配置" @click="loadConfig">
    <icon-download class="nav-item-icon" />
    <span>读</span>
  </AnimateButton>
  <a-drawer
    popup-container=".view-container"
    v-model:visible="drawerVisible"
    title="选择版本"
    :width="300"
    :footer="false"
    style="z-index: 2;"
  >
    <a-spin style="display: block;text-align: center;" v-if="loading" dot></a-spin>
    <a-empty v-else-if="!trees.length">暂无在线版本</a-empty>
    <template v-else>
      <section class="tree-version" v-for="(tree, index) in trees">
        <a-card hoverable :style="{ width: '100%' }">
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }"
          >
            <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
              <a-typography-text>
                <span class="version">版本{{ tree.version }}</span>
              </a-typography-text>
              <a-typography-text>
                <span
                  class="create-time"
                >{{ day(parseInt(tree.createTime)).format('YYYY/MM/DD HH:mm:ss') }}</span>
              </a-typography-text>
            </span>
          </div>
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '10px',
              gap: '6px'
            }"
          >
            <a-button
              @click="() => deleteTree(tree, index)"
              size="mini"
              status="danger"
              type="primary"
              class="apply-button"
            >删除</a-button>
            <a-button
              @click="() => applyTree(tree)"
              size="mini"
              type="primary"
              class="apply-button"
            >应用</a-button>
          </div>
        </a-card>
      </section>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { deleteTreeApi, getPageTreesApi } from '@/api';
import AnimateButton from '@/components/shared/animate-button.vue';
import { useStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import day from 'dayjs';
import { config2tree, setID } from '@tenon/engine';
const drawerVisible = ref(false);
const trees = ref<any>([]);
const loading = ref(true);


async function loadConfig() {
  drawerVisible.value = true;
  loading.value = true;
  const store = useStore();
  const pageInfo = await store.getters['page/getPageInfo'];
  const {
    _id
  } = pageInfo;
  const { success, errorMsg, data } = await getPageTreesApi(_id);
  if (!success) {
    loading.value = false;
    return Message.error(errorMsg!);
  }
  trees.value = data;
  console.log(data);

  loading.value = false;
}

function applyTree(tree) {
  const store = useStore();
  const config = tree.tree;
  store.dispatch(
    'viewer/setTree',
    config2tree(
      { materialsMap: store.getters['materials/getMaterialsMap'] }
    )(config),
  );
  setID(tree.newestId || 1000);
  Message.success('应用成功');
}

async function deleteTree(tree, index) {
  const store = useStore();
  const version = tree.version;
  const pageInfo = await store.getters['page/getPageInfo'];
  const {
    _id: pageId
  } = pageInfo;
  deleteTreeApi({
    version,
    pageId: pageId,
  }).then(({success, data, errorMsg}) => {
    if(!success) {
      Message.error(errorMsg!);
    } else {
      Message.success(data);
      trees.value.splice(index, 1);
    }
  });
}
</script>
<style lang="scss" scoped>
.tree-version {
  display: flex;
  justify-content: space-between;
  align-items: bottom;
  margin: 10px 2px;
}

.version {
  font-size: 16px;
  font-weight: bold;
}
.create-time {
  font-size: 12px;
  color: #333;
  margin-left: 5px;
}

.apply-button {
  // margin-top: -5px;
}
</style>