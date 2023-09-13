<template>
  <a-layout style="height: 100%;overflow: hidden;">
    <a-layout-header>
      <Header :icon-routes="['ABOUT']" style="height: 60px; box-shadow: 2px 0 5px 0 rgb(0 0 0 / 8%);"></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="520px">
        <AuthSider></AuthSider>
      </a-layout-sider>
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
import AuthSider from '../components/layout-comps/auth/auth-sider.vue';

</script>
<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}
</style>