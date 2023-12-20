<template>
  <section class="footer-container">
    <TButton variant="text" theme="default" size="small" @click="close">
      <span style="color: #777">关闭</span>
    </TButton>
    <TButton variant="text" theme="primary" size="small" @click="reload">刷新</TButton>
  </section>
</template>
<script setup lang="ts">
  const props = defineProps<{
    updateServiceWorker: () => () => void;
  }>()
  const { updateServiceWorker } = props;
  const $emit = defineEmits(['close']);

  const reload = async () => {
    await updateServiceWorker();
    window.location.reload();
  };

  const close = () => {
    $emit('close');
  };
</script>
<style lang="scss" scoped>
  .footer-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }
</style>
