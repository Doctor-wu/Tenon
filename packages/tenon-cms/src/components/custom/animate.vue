<template>
  <section
    class="animation-wrapper"
    :class="[animate ? 'animate' : '']"
    :style="animate ? animationObj : undefined"
  >
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{
  animateName: string;
  duration?: number;
  timingFunction?: string;
}>();

const animate = ref(false);
let running = false;
defineExpose({
  run() {
    if (running) return;
    running = true;
    animate.value = true;
    setTimeout(() => {
      animate.value = false;
      running = false;
    }, props.duration || 1000);
  }
});
const animationObj = computed(() => {
  const { animateName, duration = 500, timingFunction = 'ease-in-out' } = props;
  return {
    animationName: animateName,
    animationDuration: `${duration}ms`,
    animationTimingFunction: timingFunction,
  }
});
</script>

<style lang="scss" scoped>
.animation-wrapper {
  display: inline-block;
  overflow: hidden;
  &.animate {
    position: relative;
  }
}
</style>