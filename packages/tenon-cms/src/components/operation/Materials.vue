<template>
  <section class="materials-container">
    <a-menu :auto-open="true" :style="{ borderRadius: '4px' }" :collapsed="false" :level-indent="0">
      <a-sub-menu v-for="type in store.getters['materials/getMaterials']">
        <template #title>
          <section class="category-header">
            <section>
              <span style="font-size: 20px;">{{ type[0] }}</span>
              <span class="category-count-wrapper">
                <span class="category-count">{{ type[1].length }}</span>
              </span>
            </section>
          </section>
        </template>
        <CompItem :config="config" v-for="config in type[1]" />
      </a-sub-menu>
    </a-menu>
  </section>
</template>
<script setup lang="ts">
import { useStore } from '../../store';
import CompItem from './comp-item.vue';
const store = useStore();

</script>

<style lang="scss" scoped>
.category-header {
  display: flex;
  align-items: center;
  font-family: "pomo", Courier, monospace;
}
.category-count {
  font-size: 16px;
  margin-top: 2px;
}

.category-count-wrapper {
  background-color: #1693ef;
  color: #fff;
  border-radius: 3px;
  padding: 2px 6px;
  margin-left: 5px;
  display: inline-flex;
  height: 20px;
  align-items: center;
}
</style>