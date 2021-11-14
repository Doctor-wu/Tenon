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
      <section style="text-align: center;">
        <TextButton
          info="提升到父级"
          :disabled="!activeComponent.parent.parent"
          @click="() => extractActiveComponentFromParent(activeComponent)"
        >
          父
          <template name="info">提升到父级</template>
        </TextButton>
        <TextButton
          info="向上移动"
          :disabled="!canUpMove"
          @click="() => upMoveActiveComponent(activeComponent)"
        >
          上
          <template name="info">提升到父级</template>
        </TextButton>
        <TextButton
          info="向下移动"
          :disabled="!canDownMove"
          @click="() => downMoveActiveComponent(activeComponent)"
        >下</TextButton>
        <TextButton
          info="复制元素"
          @click="() => copyActiveComponent(activeComponent, activeComponent.parent)"
          color="#00b42a"
        >复</TextButton>
        <TextButton
          info="删除元素"
          @click="() => deleteActiveComponent(activeComponent)"
          color="#f53f3f"
        >删</TextButton>
      </section>
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
import TextButton from '../custom/text-button.vue';

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