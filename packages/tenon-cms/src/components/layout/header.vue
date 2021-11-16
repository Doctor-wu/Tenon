<template>
  <section class="wrapper">
    <h2>
      Tenon
      <span class="sub-title">一站式低代码平台</span>
    </h2>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="https://github.com/Doctor-wu/Tenon" target="_blank" class="icon-router">
          <TextButton>
            <icon-github />
          </TextButton>
        </a>
      </li>
      <li class="nav-item" v-for="item in routerNavs">
        <router-link :to="item.path">
          <TextButton size="18px">{{ item.name }}</TextButton>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import TextButton from '../custom/text-button.vue';
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
  padding: 10px 20px;
  box-sizing: border-box;
  justify-content: space-between;
}

.sub-title {
  font-size: 13px;
  color: #999;
  font-weight: 500;
}

.nav-list {
  display: flex;
  height: 50px;
}

.nav-item {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.icon-router {
  font-size: 24px;
}
</style>

