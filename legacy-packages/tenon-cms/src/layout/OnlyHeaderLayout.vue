<template>
  <a-layout style="height: 100%;">
    <a-layout-header>
      <Header :icon-routes="[]" style="height: 60px; box-shadow: 2px 0 5px 0 rgb(0 0 0 / 8%);"></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-content class="content">
        <CacheView></CacheView>
      </a-layout-content>
    </a-layout>
    <!-- <a-layout-footer>Footer</a-layout-footer> -->
  </a-layout>
</template>
<script setup lang="ts">
import CacheView from './CacheView.vue';
import Header from '@/components/layout-comps/header/header.vue';

</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;
}
</style>