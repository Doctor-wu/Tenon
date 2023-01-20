<template>
  <section id="workbench-footer">
    <section class="footer-left">
      <section :key="item.name" v-for="(item) in leftItems" class="item-wrapper">
        <FootBarItem :config="item"></FootBarItem>
      </section>
    </section>
    <section class="footer-right">
      <section :key="item.name" v-for="(item) in rightItems" class="item-wrapper">
        <FootBarItem :config="item"></FootBarItem>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { FootBarAlignment, FootBarConfig } from "../../interfaces";
import FootBarItem from "./foot-bar-item.vue";
const { config } = defineProps<{
  config: FootBarConfig,
}>();

const leftItems = computed(() => {
  return config.config.filter((item) => item.alignment === FootBarAlignment.Left && !item.hidden);
});

const rightItems = computed(() => {
  return config.config.filter((item) => item.alignment === FootBarAlignment.Right && !item.hidden);
});

</script>
<style lang="scss" scoped>
#workbench-footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0px -12px 55px #33333322;
  height: 33px;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.item-wrapper {
  display: flex;
  align-items: center;
  margin: 0 3px;
}

.footer-left, .footer-right {
  display: flex;
  align-items: center;
}

</style>
