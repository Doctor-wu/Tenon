<template>
  <section class="nav-wrapper">
    <TextToggle
      :value="editMode"
      @change="(...args: any[]) => toggleEditMode(...args)"
      :info="editMode ? '编辑模式' : '预览模式'"
      :color="editMode ? '#1693ef' : '#00b42a'"
    >
      <icon-edit v-if="editMode" class="nav-item-icon" />
      <icon-eye v-else class="nav-item-icon" />
      <span>{{ editMode ? '编辑' : '预览' }}</span>
    </TextToggle>
    <AnimateButton info="保存页面配置" @click="saveTree">
      <icon-upload class="nav-item-icon" />
      <span>存</span>
    </AnimateButton>
    <AnimateButton info="读取页面配置" @click="loadConfig">
      <icon-download class="nav-item-icon" />
      <span>读</span>
    </AnimateButton>
    <AnimateButton info="清空页面配置" @click="deleteConfig" color="#f53f3f">
      <icon-eraser class="nav-item-icon" />
      <span>清</span>
    </AnimateButton>
    <Deletor></Deletor>
  </section>
</template>
<script setup lang="ts">
import { editMode, toggleEditMode } from '~logic/viewer-status';
import TextToggle from '~components/shared/text-toggle.vue';
import { useStore } from '@/store';
import { h } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import AnimateButton from '~components/shared/animate-button.vue';
import { downloadTree, uploadTree } from '~logic/tree-operation';
import Deletor from './deletor.vue';

const store = useStore();

function saveTree() {
  const tree = store.getters['viewer/getTree'];
  const run = async () => {
    await uploadTree(tree);
    Message.success('保存页面配置成功');
  }
  const content = () => h('p', {
    style: {
      textAlign: 'center',
      fontSize: '16px',
      color: '#666'
    }
  }, tree.children.length > 0 ? '已存在页面配置，是否要覆盖已有缓存?' : '当前页面没有组件，是否清空页面缓存配置？');
  Modal.confirm({
    title: '提示',
    content,
    okText: '确认',
    cancelText: '取消',
    onOk: run,
  });
}

async function loadConfig() {
  const currentTree = store.getters['viewer/getTree'];
  const run = async () => {
    const config = await downloadTree();
    if (!config) {
      Message.warning('读取失败, 未发现页面缓存');
      return;
    }
    Message.success('读取页面配置成功');
    console.log(config);
  }
  if (currentTree.children.length !== 0) {
    const content = () => h('p', {
      style: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#666'
      }
    }, '当前页面非空,是否覆盖页面配置？');
    Modal.confirm({
      title: '提示',
      content,
      okText: '确认',
      cancelText: '取消',
      onOk: run,
    });
  } else {
    run();
  }
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
.nav-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  box-sizing: border-box;
  justify-content: start;
}

.nav-item-icon {
  font-size: 16px;
}
</style>