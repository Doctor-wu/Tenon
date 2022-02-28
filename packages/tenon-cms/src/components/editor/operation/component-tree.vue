<template>
  <section class="tree-container">
    <a-tree
      v-if="store.getters['viewer/getTree']"
      blockNode
      :fieldNames="{
        key: 'id',
        title: 'name',
        children: 'children'
      }"
      :default-expand-all="true"
      :show-line="true"
      :data="[store.getters['viewer/getTree']]"
      @select="setActiveComp"
    />
  </section>
</template>
<script setup lang="ts">
import { useStore } from '../../../store';
function setActiveComp(selectedKeys: string[], event: any) {
  store.dispatch('viewer/setActiveComponent', event.node);
}

const store = useStore();

</script>
<style lang="scss" scoped>
</style>