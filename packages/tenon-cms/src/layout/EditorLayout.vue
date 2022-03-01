<template>
  <section class="layout-container">
    <section class="header-container">
      <Header icon-routes="*"></Header>
    </section>
    <section class="layout-body">
      <section class="operation-container">
        <Operation></Operation>
      </section>
      <section class="view-container">
        <CacheView></CacheView>
      </section>
      <section class="attrsPanel-container">
        <AttrsPanel></AttrsPanel>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import Header from '~components/layout-comps/header.vue';
import Operation from '~components/editor/operation/index.vue';
import AttrsPanel from '~components/editor/attrs-panel/index.vue';
import CacheView from './CacheView.vue';
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layout-container .header-container {
  height: 60px;
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.layout-container .layout-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  padding-top: 60px;
  height: 100vh;
  box-sizing: border-box;
}

.layout-body .operation-container {
  width: 400px;
  min-width: 300px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #e5e5e5;
  display: flex;
}

.layout-body .view-container {
  flex: 1;
  min-width: 768px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0, 0);
  padding-top: 64px;
  padding-bottom: 40px;
  box-sizing: border-box;
}

.layout-body .attrsPanel-container {
  width: 400px;
  min-width: 300px;
  height: 100%;
  background-color: #fff;
  border-left: 1px solid #e5e5e5;
  display: flex;
}
</style>