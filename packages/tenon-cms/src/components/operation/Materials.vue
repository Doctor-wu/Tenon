<template>
  <section class="materials-container">
    <a-menu :auto-open="true" :style="{ borderRadius: '4px' }" :collapsed="false" :level-indent="0">
      <a-sub-menu v-for="type in store.getters['materials/getMaterials']">
        <template #title>
          <b style="font-size: 18px;">{{ type[0] }}</b>
          <a-tag
            color="#165dff"
            size="mini"
            style="margin-left: 10px;vertical-align: -6px;border-radius: 50%;"
          >{{ type[1].length }}</a-tag>
        </template>
        <CompItem :comp="comp" v-for="comp in type[1]" />
      </a-sub-menu>
    </a-menu>
  </section>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import CompItem from './CompItem.vue';
const store = useStore();
console.log(store.getters);



</script>
<style lang="scss" scoped>
</style>