<template>
  <Animate ref="animator" animate-name="rotateY" :duration="300">
    <TextButton :info="info" @click="handleToggle" v-bind="$attrs">
      <slot>开</slot>
    </TextButton>
  </Animate>
</template>
<script setup lang="ts">
import TextButton from './text-button.vue';
import { ref, watch, defineEmits } from 'vue';
import Animate from './animate.vue';

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
  info: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['change']);
const animator = ref();
const handleToggle = () => {
  emit('change', !props.value);
};

watch(props, (props) => {
  animator.value.run();
});

</script>
<style lang="scss" scoped>
.text-toggle-container {
  // display: flex;
  // align-items: center;
  // justify-content: center;

  &.animation {
    animation: rotateY 0.3s ease-in-out;
  }
}
</style>