<template>
  <section class="text-toggle-container" :class="{ animation: animate }">
    <TextButton :info="info" @click="handleToggle" v-bind="$attrs">
      <slot>开</slot>
    </TextButton>
  </section>
</template>
<script setup lang="ts">
import TextButton from './text-button.vue';
import { ref, watch, defineEmits } from 'vue';

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
const animate = ref(false);
let lastValue: boolean | null = null;

const handleToggle = () => {
  emit('change', !props.value);
};

watch(props, (props) => {
  if (props.value !== lastValue) {
    animate.value = true;
    setTimeout(() => {
      animate.value = false;
    }, 300);
  }
})

</script>
<style lang="scss" scoped>
.text-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes rotateY {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  &.animation {
    animation: rotateY 0.3s ease-in-out;
  }
}
</style>