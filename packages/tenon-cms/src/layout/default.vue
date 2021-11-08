<template>
  <section class="layout-container">
    <Header></Header>
    <section class="layout-body">
      <section class="operation-container">
        <Operation></Operation>
      </section>
      <section class="view-container">
        <router-view></router-view>
      </section>
      <section class="attrsPanel-container">
        <AttrsPanel></AttrsPanel>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import Header from '../components/layout/header.vue';
import Operation from '../components/operation/index.vue';
import AttrsPanel from '../components/attrs-panel/index.vue';
</script>
<style lang="sass" scoped>

</style>