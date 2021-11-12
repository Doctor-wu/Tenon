<template>
  <section class="nav-wrapper">
    <section class="edit-status">
      <b>编辑模式:&nbsp;</b>
      <a-switch v-model="editMode" @change="toggleEditMode"></a-switch>
    </section>
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
</script>
<style lang="scss" scoped>
.nav-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  box-sizing: border-box;
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