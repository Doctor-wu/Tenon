<template>
  <section class="nav-wrapper">
    <section class="edit-status">
      <b>编辑模式:</b>
      <a-switch v-model="editMode" @change="toggleEditMode"></a-switch>
    </section>
  </section>
</template>
<script setup lang="ts">
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
</style>