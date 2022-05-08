<template>
  <AnimateButton class="nav-item" info="读取页面配置" @click="loadConfig">
    <icon-download class="nav-item-icon" />
    <span>读</span>
  </AnimateButton>
  <a-drawer popup-container=".view-container" v-model:visible="drawerVisible" title="选择版本" :width="300" :footer="false"
    style="z-index: 2;">
    <a-upload :show-file-list="false" @change="getTreeConfigByImportFile" ref="uploader" :auto-upload="false"
      tip="可以通过之前在系统导出的JSON文件还原页面">
      <template #upload-button>
        <a-button :loading="uploading" type="primary" long>
          <icon-download></icon-download> 通过文件导入
        </a-button>
      </template>
    </a-upload>
    <a-spin style="display: block;text-align: center;" v-if="loading" dot></a-spin>
    <a-empty v-else-if="!trees.length">暂无在线版本</a-empty>
    <template v-else>
      <section class="tree-version" v-for="(tree, index) in trees">
        <a-card hoverable :style="{ width: '100%' }">
          <div :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }">
            <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
              <a-typography-text>
                <span class="version">版本{{ tree.version }}</span>
              </a-typography-text>
              <a-typography-text>
                <span class="create-time">{{ day(parseInt(tree.createTime)).format('YYYY/MM/DD HH:mm:ss') }}</span>
              </a-typography-text>
            </span>
          </div>
          <div :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '10px',
            gap: '6px'
          }">
            <a-button @click="() => deleteTree(tree, index)" size="mini" status="danger" type="primary"
              class="apply-button">删除</a-button>
            <a-button @click="() => applyTree(tree)" size="mini" type="primary" class="apply-button">应用</a-button>
          </div>
        </a-card>
      </section>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { addTenonEventApi, deleteTreeApi, getPageTreesApi, updatePageLifeCycleApi } from '@/api';
import AnimateButton from '@/components/shared/animate-button.vue';
import { useStore } from '@/store';
import { FileItem, Message } from '@arco-design/web-vue';
import { ref } from 'vue';
const store = useStore();
import day from 'dayjs';
import { config2tree, setID } from '@tenon/engine';
const drawerVisible = ref(false);
const trees = ref<any>([]);
const loading = ref(true);
const uploader = ref();
const uploading = ref(false);

async function getTreeConfigByImportFile(_fileList: FileItem[], fileItem: FileItem) {
const pageInfo = await store.getters['page/getPageInfo'];
  uploading.value = true;
  // get file content from File
  if (!fileItem.file) return;
  const file = fileItem.file!;
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async () => {
    const content = reader.result;
    const pageConfig = JSON.parse(content as string);
    const {
      tree,
      events,
      pageLifeCycle,
    } = pageConfig;
    await events.forEach(async (event) => {
      const {
        content,
        eventName,
        gather,
      } = event;
      await addTenonEventApi({
        content,
        eventName,
        gather,
        pageId: pageInfo._id,
      });
    });
    store.dispatch('page/updatePageEvent');
    Message.success('事件导入成功');
    const treeConfig = config2tree({
      materialsMap: store.getters['materials/getMaterialsMap'],
    })(tree);

    _fileList.length = 0;
    store.dispatch('viewer/setTree', treeConfig);
    Message.success('组件树导入成功');
    uploading.value = false;
  };
  // e.stopPropagation();
  // uploader.value.submit();
}


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
  setID(tree.newestId || 1);
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
  }).then(({ success, data, errorMsg }) => {
    if (!success) {
      Message.error(errorMsg!);
    } else {
      Message.success(data);
      trees.value.splice(index, 1);
    }
  });
}
</script>
<style lang="scss" scoped>
:deep(.arco-upload) {
  width: 100%;
}

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