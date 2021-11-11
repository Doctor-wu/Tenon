<template>
  <section class="wrapper">
    <a-menu
      class="menu"
      :accordion="true"
      mode="horizontal"
      :ellipsis="false"
      :default-selected-keys="['materials']"
      @menu-item-click="handleClickMenuItem"
    >
      <a-menu-item style="height: 30px;" key="materials">物料库</a-menu-item>
      <a-menu-item key="component-tree">组件树</a-menu-item>
    </a-menu>

    <Materials v-if="key === 'materials'"></Materials>
    <ComponentTree v-if="key === 'component-tree'"></ComponentTree>
  </section>
</template>
<script setup lang="ts">
import Materials from './materials.vue';
import { ref } from 'vue';
import ComponentTree from './component-tree.vue';

const key = ref('materials');

const handleClickMenuItem = (activeKey: string) => {
  key.value = activeKey;
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
}

.menu {
  padding-bottom: 5px;
  border-bottom: 1px solid #e8e8e8;
}
</style>

