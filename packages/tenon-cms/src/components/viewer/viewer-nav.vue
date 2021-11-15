<template>
  <section class="nav-wrapper">
    <TextToggle
      :value="editMode"
      @change="toggleEditMode"
      :info="editMode ? '编辑模式' : '预览模式'"
      :color="editMode ? '#1693ef' : '#00b42a'"
    >
      <icon-edit v-if="editMode" style="font-size: 18px;" />
      <icon-eye v-else style="font-size: 18px;" />
      <span>{{ editMode ? '编辑' : '预览' }}</span>
    </TextToggle>
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
</script>
<style lang="scss" scoped>
.nav-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  box-sizing: border-box;
  justify-content: flex-start;
}
.delete-comp {
  margin-right: 20px;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>