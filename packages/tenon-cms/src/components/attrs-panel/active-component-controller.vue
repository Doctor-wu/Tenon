<template>
  <TextButton
    info="提升到父级"
    :disabled="!activeComponent.parent.parent"
    @click="() => extractActiveComponentFromParent(activeComponent)"
  >父</TextButton>
  <TextButton
    info="向上移动"
    :disabled="!canUpMove"
    @click="() => upMoveActiveComponent(activeComponent)"
  >上</TextButton>
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
  <TextButton info="删除元素" @click="() => deleteActiveComponent(activeComponent)" color="#f53f3f">删</TextButton>
</template>
<script setup lang="ts">
import {
  deleteActiveComponent, upMoveActiveComponent,
  downMoveActiveComponent, extractActiveComponentFromParent, copyActiveComponent
} from '../../logic/viewer-select';
import { useStore } from '../../store';
import TextButton from '../custom/text-button.vue';
import { computed } from 'vue';

const store = useStore();
const activeComponent = computed(() => store?.getters['viewer/getActiveComponent']);

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

</script>
<style lang="">
  
</style>