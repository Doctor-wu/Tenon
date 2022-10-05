<template>
  <section id="workbench-header">
    <section class="header-info">
      <template :key="item.name" v-for="item in (infoRenders as any)">
        <component :is="item.render"></component>
      </template>
    </section>
    <section class="header-operator">
      <section :key="item.name" v-for="item in (operatorItems as any)" class="operator-item">
        <HeaderItem :operateConfig="item"></HeaderItem>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { HeaderBarConfig, IHeaderBarType } from "../core";
import HeaderItem from "./internal/header-item.vue";
const { config } = defineProps<{
  config: HeaderBarConfig,
}>();

const infoRenders = computed(() => {
  return config.filter((item) => item.type === IHeaderBarType.Info && !item.hidden);
});

const operatorItems = computed(() => {
  return config.filter((item) => item.type === IHeaderBarType.Operator && !item.hidden);
});

</script>
<style lang="scss" scoped>
#workbench-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  height: 60px;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.main-title {
  font-size: x-large;
}

.sub-title {
  font-size: medium;
  vertical-align: -1px;
  color: #777;
}

.header-operator {
  display: flex;
  align-items: center;
}

.operator-item {
  display: inline-block;
  margin: 0 3px;

  .t-button--variant-text {
    padding: 0;
    height: 40px;
    width: 40px;
  }
}
</style>
