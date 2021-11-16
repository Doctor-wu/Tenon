<template>
  <section class="wrapper">
    <section>
      <AnimateButton size="24px">
        <span style="vertical-align: -3px;">Tenon</span>
      </AnimateButton>
      <span class="sub-title">一站式低代码平台</span>
    </section>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="https://github.com/Doctor-wu/Tenon" target="_blank" class="icon-router">
          <TextButton size="28px">
            <icon-github />
          </TextButton>
        </a>
      </li>
      <li class="nav-item" v-for="item in routerNavs">
        <router-link :to="item.path">
          <AnimateButton size="20px">{{ item.name }}</AnimateButton>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import TextButton from '../custom/text-button.vue';
import AnimateButton from '../custom/animate-button.vue';
const routerNavs = [
  {
    name: '定制物料',
    path: '/',
  },
  {
    name: '文档',
    path: '/',
  },
  {
    name: '组件',
    path: '/',
  },
  {
    name: '关于',
    path: '/',
  },
];
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 20px 10px;
  box-sizing: border-box;
  justify-content: space-between;
}

.sub-title {
  font-size: 13px;
  color: #999;
  font-weight: 500;
  font-family: "pomo", Courier, monospace;
}

.nav-list {
  display: flex;
  height: 50px;
}

.nav-item {
  margin-right: 10px;
  display: flex;
  align-items: center;
  & a {
    display: flex;
    align-items: center;
  }
}

.icon-router {
}
</style>

