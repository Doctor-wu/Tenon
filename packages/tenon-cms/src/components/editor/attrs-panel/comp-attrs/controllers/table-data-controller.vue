<template>
  <section class="data-container">
    <section class="data-item" v-for="(item, index) in modelValue">
      <a-divider v-if="index > 0"></a-divider>
      <a-descriptions :data="normalizeData(item)" :column="1" />
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any[];
}>();

const normalizeData = (item) => {
  const data: any[] = [];
  Object.keys(item).forEach(key => {
    data.push({
      label: key,
      value: item[key],
    });
  });
  return data;
}
</script>
<style lang="scss" scoped>
</style>