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
      <section class="tree-version" v-for="tree in trees">
        <section>
          <span class="version">版本{{ tree.version }}</span>
          <span
            class="create-time"
          >{{ day(parseInt(tree.createTime)).format('YYYY/MM/DD HH:mm:ss') }}</span>
        </section>
        <a-button @click="() => applyTree(tree)" size="mini" type="primary" class="apply-button">应用</a-button>
      </section>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { getPageTreesApi } from '@/api';
import AnimateButton from '@/components/shared/animate-button.vue';
import { useStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import day from 'dayjs';
import { config2tree } from '@tenon/engine';
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
  Message.success('应用成功');
  // store.dispatch('viewer/setTree', )
}
</script>
<style lang="scss" scoped>
.tree-version {
  display: flex;
  justify-content: space-between;
  align-items: bottom;
  margin: 20px 2px;
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