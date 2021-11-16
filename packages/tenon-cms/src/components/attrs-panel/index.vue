<template>
  <section class="wrapper">
    <a-empty v-if="!activeComponent || !editMode" style="margin: auto;">未选中组件</a-empty>
    <section v-else class="attr-menus">
      <a-tabs
        class="attr-menus-wrapper"
        :default-active-key="attrs[0].title"
        animation
        size="large"
      >
        <a-tab-pane :key="type.title" v-for="type in attrs">
          <template #title>
            <component :is="toRaw(type.icon)" />
            &nbsp;{{ type.title }}
          </template>
          <section style="padding: 0 20px;">
            <component :is="toRaw(type.component)"></component>
          </section>
        </a-tab-pane>
      </a-tabs>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useStore } from '../../store';
import { computed, effect, ref, toRaw } from 'vue';
import { editMode } from '../../logic/viewer-status';
import CompAttrs from './comp-attrs.vue';
import BaseInfo from './base-info.vue';

const store = useStore();
const activeComponent = computed(() => store?.getters['viewer/getActiveComponent']);
const map = computed(() => store?.getters['materials/getMaterialsMap']);
const attrs = ref([
  {
    title: '基础',
    icon: 'icon-info-circle',
    component: BaseInfo,
  },
  {
    title: '拷贝',
    icon: 'icon-copy',
    component: CompAttrs,
  },
]);

// effect(() => {
//   console.log(
//     map.value.get(activeComponent?.value?.name)?.().config,
//     activeComponent.value
//   )
// });
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
}

.attr-menus {
  width: 100%;
}
:deep(.arco-tabs-nav-tab) {
  padding: 10px 20px;
  height: 44px;
}

:deep(.arco-tabs-nav) {
  min-height: 64px;
}
:deep(.arco-tabs-content) {
  flex: 1;
  overflow: auto;
}
.attr-menus-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>