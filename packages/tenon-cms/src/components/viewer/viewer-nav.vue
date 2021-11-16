<template>
  <section class="nav-wrapper">
    <TextToggle
      :value="editMode"
      @change="toggleEditMode"
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
      <icon-download class="nav-item-icon" />读
    </AnimateButton>
    <section
      v-if="dragging && !draggingMaterial"
      @dragover.prevent="() => { }"
      @dragenter.prevent="() => { }"
      @drop="deleteDraggingComponent"
      class="delete-comp"
    >
      <icon-delete style="font-size: 18px;" />
      <b>拖到此处删除组件</b>
    </section>
  </section>
</template>
<script setup lang="ts">
import { dragging, draggingMaterial, deleteDraggingComponent } from '../../logic/viewer-drag';
import { editMode, toggleEditMode } from '../../logic/viewer-status';
import TextToggle from '../custom/text-toggle.vue';
import { getTreeModel } from '../../local-db';
import { useStore } from '../../store';
import { config2tree, tree2config } from '../../logic/config-transform';
import { toRaw, h } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import AnimateButton from '../custom/animate-button.vue';

const treeModel = getTreeModel();
const store = useStore();

function saveTree() {
  const tree = store.getters['viewer/getTree'];
  if (tree.children.length === 0) {
    Modal.confirm({
      title: '提示',
      content: () => h('p', {
        style: {
          textAlign: 'center',
          fontSize: '16px',
          color: '#666'
        }
      }, '当前页面没有组件，是否清空页面配置？'),
      okText: '确认清空',
      cancelText: '取消',
      onOk: () => {
        const config = toRaw(tree2config(tree));

        treeModel.set({
          config,
          lastID: store.getters['viewer/getCompId'],
        }).then(() => {
          Message.success('保存页面配置成功');
        });
      }
    });
    return;
  }
}

async function loadConfig() {
  const {
    lastID,
    config,
  } = await treeModel.get() as any;
  store.dispatch('viewer/setCompId', lastID);
  config2tree(config);
  store.dispatch('viewer/setTree', config);
  Message.success('读取页面配置成功');
  console.log(config);

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
.delete-comp {
  margin-right: 20px;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-item-icon {
  font-size: 16px;
}
</style>