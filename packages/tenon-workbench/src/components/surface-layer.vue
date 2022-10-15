<template>
  <section class="workbench-surface-root">
    <section ref="surfaceRef" class="surface"></section>
  </section>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { WorkbenchType } from '../core';
import { SurfaceService, SurfaceServiceCore } from '../services';

const surfaceRef = ref<HTMLElement>();

onMounted(() => {
  const workbench = inject<WorkbenchType>('workbench');
  const surface = workbench!.workbenchDIService.getServiceInstance<SurfaceServiceCore>(SurfaceService)!;
  surface.attach(surfaceRef.value!);
});

</script>
<style lang="scss" scoped>
  .workbench-surface-root {
    position: absolute;
    left: 0;
    top: 0;
    transform: scale(1);
    
    .surface {
      position: fixed;
      left: 50px;
      top: 50px;
    }
  }
</style>