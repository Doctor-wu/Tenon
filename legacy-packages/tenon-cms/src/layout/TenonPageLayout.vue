<template>
  <a-layout style="height: 100%;overflow: hidden;">
    <a-layout-header>
      <Header :icon-routes="['ABOUT', 'MINE']" style="height: 60px; box-shadow: 2px 0 5px 0 rgb(0 0 0 / 8%);"></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="320px">
        <TenonPageSider></TenonPageSider>
      </a-layout-sider>
      <a-layout-content class="content">
        <PageNav></PageNav>
        <CacheView></CacheView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import CacheView from './CacheView.vue';
import Header from '@/components/layout-comps/header/header.vue';
import TenonPageSider from '@/components/layout-comps/tenon-project/tenon-page-sider.vue';
import PageNav from '@/components/page-list/page-nav.vue';

</script>
<style lang="scss" scoped>
.content {
  padding: 12px 24px;
}
</style>