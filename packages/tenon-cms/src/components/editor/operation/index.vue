<template>
  <section class="wrapper">
    <a-tabs class="menu" default-active-key="materials" animation size="large">
      <a-tab-pane key="materials">
        <template #title>
          <icon-apps />&nbsp;物料库
        </template>
        <Materials></Materials>
      </a-tab-pane>
      <a-tab-pane key="component-tree" style="margin-left: 20px;">
        <template #title>
          <icon-branch />&nbsp;组件树
        </template>
        <ComponentTree></ComponentTree>
      </a-tab-pane>
    </a-tabs>
  </section>
</template>
<script setup lang="ts">
import Materials from './Materials.vue';
import ComponentTree from './component-tree.vue';

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
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
}
:deep(.arco-tabs-nav) {
  min-height: 64px;
}
:deep(.arco-tabs-content) {
  flex: 1;
  overflow: auto;
}

:deep(.arco-tabs-nav-tab) {
  padding: 10px 20px;
  height: 44px;
}
</style>

