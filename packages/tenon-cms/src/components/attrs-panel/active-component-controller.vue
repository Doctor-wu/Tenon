<template>
  <AnimateButton
    info="提升到父级"
    :disabled="!activeComponent?.parent?.parent"
    @click="() => extractActiveComponentFromParent(activeComponent)"
  >父</AnimateButton>
  <AnimateButton
    info="向上移动"
    :disabled="!canUpMove"
    @click="() => upMoveActiveComponent(activeComponent)"
  >上</AnimateButton>
  <AnimateButton
    info="向下移动"
    :disabled="!canDownMove"
    @click="() => downMoveActiveComponent(activeComponent)"
  >下</AnimateButton>
  <AnimateButton
    info="复制元素"
    @click="() => copyActiveComponent(activeComponent, activeComponent.parent)"
    color="#00b42a"
  >复</AnimateButton>
  <AnimateButton info="删除元素" @click="() => deleteActiveComponent(activeComponent)" color="#f53f3f">删</AnimateButton>
  <AnimateButton
    v-if="activeComponent.children"
    info="清空子元素"
    :disabled="!activeComponent.children?.length"
    @click="() => clearActiveComponentChildren(activeComponent)"
    color="#f53f3f"
  >清</AnimateButton>
</template>
<script setup lang="ts">
import {
  deleteActiveComponent, upMoveActiveComponent,
  downMoveActiveComponent, extractActiveComponentFromParent,
  copyActiveComponent, clearActiveComponentChildren
} from '../../logic/viewer-active-component';
import { useStore } from '../../store';
import { computed } from 'vue';
import AnimateButton from '../custom/animate-button.vue';

const store = useStore();
const activeComponent = computed(() => store?.getters['viewer/getActiveComponent']);

const canUpMove = computed(() => {
  const { parent } = activeComponent.value;
  if (!parent) return false;
  const index = parent.children.findIndex(item => item.id === activeComponent.value.id);
  return parent && index > 0;
});

const canDownMove = computed(() => {
  const { parent } = activeComponent.value;
  if (!parent) return false;
  const index = parent.children.findIndex(item => item.id === activeComponent.value.id);
  return parent && index < parent.children.length - 1;
});

</script>
<style lang="">
  
</style>