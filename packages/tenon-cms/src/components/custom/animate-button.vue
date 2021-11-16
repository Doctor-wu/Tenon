<template>
  <Animate ref="animator" animate-name="button-debounce" :duration="300">
    <TextButton @click="handleClick" v-bind="$attrs">
      <slot></slot>
    </TextButton>
  </Animate>
</template>
<script lang="ts" setup>
import Animate from './animate.vue';
import { ref, computed } from 'vue';
import TextButton from './text-button.vue';
const props = defineProps({
  duration: {
    type: Number,
    default: 300,
  },
  animateName: {
    type: String,
    default: 'button-debounce',
  },
});

const emit = defineEmits(['click']);

const animator = ref();

function handleClick(...args) {
  animator.value.run();
  emit('click', ...args);
}

</script>
<style lang="scss" scoped>
</style>