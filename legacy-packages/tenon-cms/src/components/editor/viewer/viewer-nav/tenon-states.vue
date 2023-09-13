<template>
  <AnimateButton  class="nav-item" color="gold" info="设置页面状态" @click="handleSetEvent">
    <icon-storage size="18" class="nav-item-icon" />
    <span>状态</span>
  </AnimateButton>
  <TenonStatesModal ref="modal"></TenonStatesModal>
</template>
<script setup lang="ts">
import AnimateButton from '@/components/shared/animate-button.vue';
import { ref } from 'vue';
import TenonStatesModal from '../modal/tenon-states-modal.vue';

const modal = ref<any>();
const handleSetEvent = () => {
  modal.value.open();
}
</script>
<style lang="scss" scoped>
</style>