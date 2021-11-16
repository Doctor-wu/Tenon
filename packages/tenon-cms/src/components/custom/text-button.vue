<template>
  <a-popover v-if="info && !disabled" :position="infoPosition">
    <Animate ref="animator" animate-name="button-debounce" :duration="300">
      <section
        v-bind="$attrs"
        class="text-button-container"
        @click="handleClick"
        :class="{ disabledStyle: disabled }"
      >
        <slot></slot>
      </section>
    </Animate>
    <template #content>{{ info }}</template>
  </a-popover>
  <Animate v-else ref="animator" animate-name="button-debounce" :duration="300">
    <section
      class="text-button-container"
      @click="handleClick"
      :class="{ disabledStyle: disabled }"
    >
      <slot></slot>
    </section>
  </Animate>
</template>
<script lang="ts" setup>
import Animate from './animate.vue';
import { ref } from 'vue';
const props = defineProps({
  text: {
    type: String,
    default: '按钮'
  },
  color: {
    type: String,
    default: '#165dff'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  info: {
    type: String,
    default: '',
  },
  infoPosition: {
    type: String,
    default: 'bottom'
  }
});

const emit = defineEmits(['click']);

const animator = ref();

function handleClick(...args) {
  if (props.disabled) return;
  animator.value.run();
  emit('click', ...args);
}

</script>
<style lang="scss" scoped>
.text-button-container {
  display: inline-block;
  padding: 5px 10px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 21px;
  font-family: "pomo", Courier, monospace;
  user-select: none;

  &:hover {
    color: v-bind(color);
  }

  &.disabledStyle {
    color: #afafaf;
    cursor: not-allowed;
  }
}
</style>