<template>
  <section id="workbench-header">
    <section class="header-info">
      <template v-for="(item) in infoRenders" :key="item.name">
        <component :is="item.render" :style="item.style"></component>
      </template>
    </section>
    <section class="header-operator">
      <section :key="item.name" v-for="(item) in operatorItems" class="operator-item" :style="item.style">
        <HeaderItem :operateConfig="item"></HeaderItem>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { HeaderBarConfig, HeaderBarType, IHeaderBarOperatorItem } from "../../interfaces";
import HeaderItem from "./header-item.vue";
const { config } = defineProps<{
  config: HeaderBarConfig,
}>();

const infoRenders = computed(() => {
  return config.config.filter((item) => item.type === HeaderBarType.Info && !item.hidden);
});

const operatorItems = computed<IHeaderBarOperatorItem[]>(() => {
  return config.config.filter((item) => item.type === HeaderBarType.Operator && !item.hidden) as IHeaderBarOperatorItem[];
});

</script>
<style lang="scss" scoped>
#workbench-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  height: 60px;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  transition: all ease .3s;
  z-index: 1;
}

.header-info {
  display: flex;
  align-items: center;
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
    height: 30px;
    width: 30px;
  }
}
</style>
