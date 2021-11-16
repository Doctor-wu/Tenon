<template>
  <a-popover v-if="info && !disabled" :position="infoPosition">
    <section
      v-bind="$attrs"
      class="text-button-container"
      :style="{ fontSize: size || '21px' }"
      @click="handleClick"
      :class="{ disabledStyle: disabled }"
    >
      <slot>按钮</slot>
    </section>
    <template #content>{{ info }}</template>
  </a-popover>
  <section
    v-else
    class="text-button-container"
    @click="handleClick"
    :style="{ fontSize: size || '21px' }"
    :class="{ disabledStyle: disabled }"
  >
    <slot>按钮</slot>
  </section>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
const props = defineProps({
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
  },
  size: {
    type: String,
    default: '21px'
  },
});

const emit = defineEmits(['click']);

function handleClick(...args) {
  if (props.disabled) return;
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