<template>
  <section class="attrs-wrapper">
    <section class="attrs-info">
      <a-descriptions :column="1" :data="compDescriptions" layout="inline-horizontal">
        <template #title>
          <b>{{ activeComponent.name }}</b>
        </template>
        <template v-slot:value="{ value }">
          <pre class="pre-text">{{ value }}</pre>
        </template>
      </a-descriptions>
      <a-divider></a-divider>
      <a-button-group style="text-align: center;display: block;">
        <a-button
          type="primary"
          status="success"
          @click="() => extractActiveComponentFromParent(activeComponent)"
          :disabled="!activeComponent.parent.parent"
        >
          <icon-double-up />移出父级
        </a-button>
        <a-button
          type="primary"
          :disabled="!canUpMove"
          @click="() => upMoveActiveComponent(activeComponent)"
        >
          <icon-arrow-up />上移
        </a-button>
        <a-button
          type="primary"
          :disabled="!canDownMove"
          @click="() => downMoveActiveComponent(activeComponent)"
        >
          <icon-arrow-down />下移
        </a-button>
      </a-button-group>
      <a-button-group style="text-align: center;display: block;margin-top: 20px;">
        <a-button
          type="primary"
          status="success"
          @click="() => copyActiveComponent(activeComponent, activeComponent.parent)"
        >
          <icon-copy />复制
        </a-button>
        <a-button
          type="primary"
          status="danger"
          @click="() => deleteActiveComponent(activeComponent)"
        >
          <icon-delete />删除
        </a-button>
      </a-button-group>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import { computed } from 'vue';
import {
  deleteActiveComponent, upMoveActiveComponent,
  downMoveActiveComponent, extractActiveComponentFromParent, copyActiveComponent
} from '../../logic/viewer-select';

const store = useStore();
const activeComponent = computed(() => store?.getters['viewer/getActiveComponent']);
const map = computed(() => store?.getters['materials/getMaterialsMap']);

const canUpMove = computed(() => {
  const { parent } = activeComponent.value;
  const index = parent.children.findIndex(item => item.id === activeComponent.value.id);
  return parent && index > 0;
});

const canDownMove = computed(() => {
  const { parent } = activeComponent.value;
  const index = parent.children.findIndex(item => item.id === activeComponent.value.id);
  return parent && index < parent.children.length - 1;
});

const compDescriptions = computed(() => {
  const comp = activeComponent.value;
  const compRaw = map.value.get(comp.name)();
  const descriptions: any[] = [
    {
      label: 'ID: ',
      value: comp.id,
    },
    {
      label: '组件名称: ',
      value: comp.name,
    },
    {
      label: 'description: ',
      value: compRaw.config.description.toString(),
    },
    {
      label: 'config: ',
      value: JSON.stringify(compRaw.config, null, 2),
    }
  ];
  return descriptions;
});

</script>
<style lang="scss" scoped>
.attrs-info {
}
.attrs-wrapper {
  width: 100%;
  overflow: auto;
}

.pre-text {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>