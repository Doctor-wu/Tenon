import { ref } from 'vue';
<template>
  <AnimateButton color="lightseagreen" info="设置页面事件" @click="handleSetEvent">
    <icon-command size="18" class="nav-item-icon" />
    <span>事件</span>
  </AnimateButton>
  <TenonEventModal ref="modal"></TenonEventModal>
</template>
<script setup lang="ts">
import AnimateButton from '@/components/shared/animate-button.vue';
import { ref } from 'vue';
import TenonEventModal from '../modal/tenon-event-modal.vue';

const modal = ref<any>();
const handleSetEvent = () => {
  modal.value.open();
}
</script>
<style lang="scss" scoped>
</style>