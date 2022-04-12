<template>
  <section class="nav-wrapper">
    <section class="nav-scroller">
      <a-page-header
        style="display: inline-block;padding: 0;"
        @back="$router.push(`/page-list/${projectInfo._id}`)"
        :title="projectInfo?.projectName"
        :subtitle="pageInfo?.pageName"
      ></a-page-header>
      <a-divider direction="vertical"></a-divider>
      <TextToggle
        :value="editMode"
        @change="(...args: any[]) => toggleEditMode(...args)"
        :info="editMode ? '编辑模式' : '预览模式'"
        :color="editMode ? '#1693ef' : '#00b42a'"
      >
        <icon-edit size="18" v-if="editMode" class="nav-item-icon" />
        <icon-eye size="18" v-else class="nav-item-icon" />
        <span>{{ editMode ? '编辑' : '预览' }}</span>
      </TextToggle>
      <AnimateButton info="清空页面配置" @click="deleteConfig" color="#f53f3f">
        <icon-eraser size="18" class="nav-item-icon" />
        <span>清</span>
      </AnimateButton>
      <a-divider direction="vertical" class="nav-divider"></a-divider>
      <AnimateButton info="保存页面配置" @click="saveTree">
        <icon-upload size="18" class="nav-item-icon" />
        <span>存</span>
      </AnimateButton>
      <LoadConfig></LoadConfig>
      <a-divider direction="vertical" class="nav-divider"></a-divider>
      <TenonEvent></TenonEvent>
      <TenonStates></TenonStates>
      <TenonLifecycle></TenonLifecycle>
      <a-divider direction="vertical" class="nav-divider"></a-divider>
      <Scale></Scale>
      <Deletor></Deletor>
    </section>
  </section>
</template>
<script setup lang="ts">
import { editMode, toggleEditMode } from '~logic/viewer-status';
import TextToggle from '~components/shared/text-toggle.vue';
import { useStore } from '@/store';
import { computed, h, ref, watchEffect } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import AnimateButton from '~components/shared/animate-button.vue';
import { tree2config, getID } from '@tenon/engine';
import Deletor from '../deletor.vue';
import Scale from './scale.vue';
import { saveTreeApi } from '@/api/page';
import LoadConfig from './load-config.vue';
import TenonEvent from './tenon-event.vue';
import TenonStates from './tenon-states.vue';
import TenonLifecycle from './tenon-lifecycle.vue';

const store = useStore();
const pageInfo = ref<any>({});
const projectInfo = ref<any>({});

watchEffect(() => {
  const store = useStore();
  store.getters['page/getPageInfo'].then((data) => {
    pageInfo.value = data;
  });
}, {
  flush: 'post'
});

watchEffect(() => {
  const store = useStore();
  store.getters['project/getProjectInfo'].then((data) => {
    projectInfo.value = data;
  });
}, {
  flush: 'post'
});

async function saveTree() {
  const tree = store.getters['viewer/getTree'];
  const config = tree2config(tree);
  saveTreeApi({
    tree: config,
    version: pageInfo.value.newestVersion + 1,
    belongPageId: pageInfo.value._id,
    newestId: getID(),
  }).then(({ success, errorMsg, successText }) => {
    if (!success) {
      Message.error(errorMsg!);
    } else {
      Message.success(successText);
      store.dispatch('page/setPageInfo', {
        ...pageInfo.value,
        newestVersion: pageInfo.value.newestVersion + 1
      });
    }
  });
}

function deleteConfig() {
  const run = () => {
    store.dispatch('viewer/clearTree');
  }
  const content = () => h('p', {
    style: {
      textAlign: 'center',
      fontSize: '16px',
      color: '#666'
    }
  }, '是否要清空当前页面配置？');
  Modal.confirm({
    title: '提示',
    content,
    okText: '确认清空',
    cancelText: '取消',
    onOk: run,
  });
}
</script>

<style lang="scss" scoped>
:deep(.arco-page-header-wrapper) {
  padding: 0;
}
.nav-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  box-sizing: border-box;
  justify-content: start;
  margin-right: 40px;
  overflow: auto hidden;
  &::-webkit-scrollbar {
    display: none !important; /* Chrome Safari */
  }
}

.nav-scroller {
  white-space: nowrap;
}

.nav-divider {
  margin: 0 5px;
}

.nav-item {
  min-width: 80px;
}

:deep(.nav-item-icon),
.nav-item-icon {
  font-size: 16px;
}
</style>