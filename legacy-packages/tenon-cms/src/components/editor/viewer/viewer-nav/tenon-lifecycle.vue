<template>
  <AnimateButton class="nav-item" color="#7816ff" info="设置页面事件" @click="handleSetEvent">
    <icon-relation size="18" class="nav-item-icon" />
    <span>周期</span>
  </AnimateButton>
  <TenonLifecycleModal v-if="renderModal" ref="modal"></TenonLifecycleModal>
</template>
<script setup lang="ts">
import AnimateButton from '@/components/shared/animate-button.vue';
import { nextTick, ref } from 'vue';
import TenonLifecycleModal from '../modal/tenon-lifecycle-modal.vue';

const renderModal = ref(false);

const modal = ref<any>();
const handleSetEvent = () => {
  renderModal.value = true;
  nextTick(() => {
    modal.value.open();
  })
}
</script>
<style lang="scss" scoped>
</style>