<template>
  <section class="wrapper">
    <section>
      <AnimateButton @click="$router.push('/')" size="24px">
        <span style="vertical-align: -3px;">Tenon</span>
      </AnimateButton>
      <span class="sub-title">渐进式低代码平台</span>
    </section>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="https://github.com/Doctor-wu/Tenon" target="_blank" class="icon-router">
          <TextButton size="28px">
            <icon-github />
          </TextButton>
        </a>
      </li>
      <li class="nav-item" v-for="item in routeNavs">
        <router-link v-if="item.path" :to="item.path">
          <AnimateButton size="20px">{{ item.name }}</AnimateButton>
        </router-link>
        <component v-else-if="item.component" :is="markRaw(item.component)"></component>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import TextButton from '~components/shared/text-button.vue';
import AnimateButton from '~components/shared/animate-button.vue';
import { markRaw, Ref, ref } from 'vue';
import Avatar from './avatar.vue';
const props = defineProps<{
  iconRoutes: string[] | '*'
}>();


const navs = [
  {
    name: '定制物料',
    path: '/',
    key: 'DM',
  },
  {
    name: '文档',
    path: '/',
    key: 'DOC',
  },
  {
    name: '组件',
    path: '/',
    key: 'COMP',
  },
  {
    name: '关于',
    path: '/about',
    key: 'ABOUT',
  },
  {
    key: 'MINE',
    component: Avatar,
  }
];
let routeNavs: Ref<(typeof navs)> = ref([]);
if (props.iconRoutes === '*') routeNavs.value = navs;
else {
  const navSet = new Set;
  props.iconRoutes.forEach(nav => {
    navSet.add(nav);
  });
  routeNavs.value = navs.map(nav => {
    return navSet.has(nav.key) ? nav : false;
  }).filter(Boolean) as typeof navs;
}

</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 12px;
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

