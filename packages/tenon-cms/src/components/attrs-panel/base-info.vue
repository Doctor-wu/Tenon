<template>
  <section class="attrs-wrapper">
    <section class="attrs-info">
      <a-descriptions :column="1" :data="compDescriptions" layout="inline-horizontal">
        <template #title>
          <b>{{ activeComponent.name }}</b>
        </template>
        <template v-slot:value="{ value }">
          <component :is="value"></component>
        </template>
      </a-descriptions>
      <a-divider></a-divider>
      <section style="text-align: center;">
        <ActiveComponentController></ActiveComponentController>
      </section>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import {
  computed, h,
} from 'vue';
import ActiveComponentController from './active-component-controller.vue';

const store = useStore();
const activeComponent = computed(() => store?.getters['viewer/getActiveComponent']);

const compDescriptions = computed(() => {
  const comp = activeComponent.value;
  console.log(comp);

  const compRaw = comp.material;
  const descriptions: any[] = [
    {
      label: 'ID: ',
      value: h('span', comp.id),
    },
    {
      label: '组件名称: ',
      value: h('span', comp.name),
    },
    {
      label: '组件描述: ',
      value: h('p', compRaw.config.description.toString()),
    },
    {
      label: '支持的平台: ',
      value: h('section', null, compRaw.config.platform.map(item => h('span', {
        style: {
          display: 'inline-block',
          margin: '0 5px',
          padding: '0 8px',
          lineHeight: '22px',
          backgroundColor: '#E8F3FF',
          color: "#165DFF",
          fontSize: '12px'
        },
      }, item))),
    },
  ];
  return descriptions;
});
</script>

<style lang="scss" scoped>
.attrs-wrapper {
  width: 100%;
  overflow: auto;
}
</style>