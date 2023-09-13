<template>
  <section class="auth-page-title-container">
    <Animate
      ref="animator"
      animate-name="slide-in-from-right"
      :duration="1000"
      timing-function="ease-out"
    >
      <span class="title">&lt;{{title}} /&gt;__</span>
    </Animate>
  </section>
</template>

<script setup lang="ts">
import Animate from '@/components/shared/animate.vue';
import { onMounted, ref } from 'vue';
const props = defineProps<{
  title: string;
}>();

const animator = ref();
onMounted(() => {
  animator.value.run();
})
</script>

<style lang="scss" scoped>
.auth-page-title-container {
  position: absolute;
  top: 32px;
  left: 32px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.title {
  font-size: 42px;
  font-weight: 200;
}
</style>