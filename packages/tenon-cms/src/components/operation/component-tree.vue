<template>
  <section class="tree-container">
    <a-tree
      blockNode
      :fieldNames="{
        key: 'id',
        title: 'name',
        children: 'children'
      }"
      :show-line="true"
      :data="[store.getters['viewer/getTree']]"
    />
  </section>
</template>
<script setup lang="ts">
import { useStore } from '../../store';

const store = useStore();

</script>
<style lang="scss" scoped>
</style>