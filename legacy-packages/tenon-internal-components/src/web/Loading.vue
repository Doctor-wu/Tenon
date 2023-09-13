<template>
  <template v-if="loadType === 'spin'">
    <template v-if="loading">
      <a-spin class="spin"></a-spin>
    </template>
    <slot v-else v-bind="$attrs"></slot>
  </template>
  <template v-else-if="loadType === 'skeleton'">
    <template v-if="loading">
      <a-skeleton class="skeleton" animation>
        <a-skeleton-line rows="2"></a-skeleton-line>
        <a-space style="margin: 15px 0">
          <a-skeleton-shape></a-skeleton-shape>
          <a-skeleton-shape shape="circle"></a-skeleton-shape>
          <a-skeleton-shape></a-skeleton-shape>
        </a-space>
        <a-skeleton-line rows="3"></a-skeleton-line>
        <a-space style="margin: 15px 0">
          <a-skeleton-shape></a-skeleton-shape>
          <a-skeleton-shape></a-skeleton-shape>
          <a-skeleton-shape shape="circle"></a-skeleton-shape>
        </a-space>
        <a-skeleton-line rows="1"></a-skeleton-line>
      </a-skeleton>
    </template>
    <slot v-else v-bind="$attrs"></slot>
  </template>
</template>
<script setup lang="ts">
defineProps<{
  loading: boolean;
  loadType: 'spin' | 'skeleton';
}>();

</script>

<style lang="scss" scoped>
  .spin,
  .skeleton {
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .skeleton {
    display: block;
    // flex-direction: column;
    // align-items: flex-start;
  }
</style>