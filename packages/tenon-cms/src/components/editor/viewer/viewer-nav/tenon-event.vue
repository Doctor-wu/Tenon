<template>
  <AnimateButton color="lightseagreen" info="设置页面事件" @click="handleSetEvent">
    <icon-command class="nav-item-icon" />
    <span>事件</span>
  </AnimateButton>
</template>
<script setup lang="ts">
  import AnimateButton from '@/components/shared/animate-button.vue';

  const handleSetEvent = () => {
    
  }
</script>
<style lang="scss" scoped>
</style>