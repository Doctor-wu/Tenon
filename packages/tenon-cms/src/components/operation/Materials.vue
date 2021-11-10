<template>
  <section class="materials-container">
    <a-menu :auto-open="true" :style="{ borderRadius: '4px' }" :collapsed="false" :level-indent="0">
      <a-sub-menu v-for="type in tree.categories">
        <template #title>
          <b style="font-size: 18px;">{{ type[0] }}</b>
          <a-tag
            color="#165dff"
            size="mini"
            style="margin-left: 10px;vertical-align: -6px;border-radius: 50%;"
          >{{ type[1].length }}</a-tag>
        </template>
        <a-menu-item class="comp-item" v-for="comp in type[1]">
          <CompItem :comp="comp" />
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import CompItem from './CompItem.vue';
const materialsRaw = import.meta.globEager('../../materials/**/*.vue');
const configRaw = import.meta.globEager('../../materials/**/*.config.json');
const categories = new Map<string, {
  [key: string]: any;
}[]>();
Object.keys(materialsRaw).forEach(key => {
  const m = key.replace('../../materials/', '');
  const configPath = key.replace('.vue', '.config.json');
  const config = configRaw[configPath].default;
  console.log(config);

  const category = m.split('/')[0];
  if (!categories.get(category)) {
    categories.set(category, []);
  }
  categories.get(category)!.push({
    name: m.split('/')[1],
    component: materialsRaw[key].default,
    config,
  });
});
const tree = reactive<{
  categories: [string, {
    [key: string]: any;
  }[]][];
}>({
  categories: [],
});

tree.categories = [...categories];
console.log(tree.categories);

</script>
<style lang="scss" scoped>
.comp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #ccccccaa;
}
</style>