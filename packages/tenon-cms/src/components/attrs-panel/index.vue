<template>
  <section class="wrapper">
    <a-empty v-if="!store.getters['component-tree/getActiveComponent']">
      未选中组件
    </a-empty>
    <section v-else>todo</section>
  </section>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>

