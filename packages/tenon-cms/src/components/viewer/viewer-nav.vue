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
      <span>{{ editMode ? '编辑模式' : '预览模式' }}</span>
    </TextToggle>
    <TextButton info="保存页面" @click="saveTree">
      <icon-download class="nav-item-icon" />存
    </TextButton>
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
import TextButton from '../custom/text-button.vue';
import { getTreeModel } from '../../local-db';
import { useStore } from '../../store';

const tree = getTreeModel();
const store = useStore();

function saveTree() {
  tree.set({
    hello: 'world',
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