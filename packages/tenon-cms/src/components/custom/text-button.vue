<template>
  <a-popover v-if="info && !disabled">
    <section
      class="text-button-container"
      @click="(...args) => !disabled && $emit('click', ...args)"
      :class="{ disabledStyle: disabled }"
    >
      <slot></slot>
    </section>
    <template #content>{{ info }}</template>
  </a-popover>
  <section
    v-else
    class="text-button-container"
    @click="(...args) => !disabled && $emit('click', ...args)"
    :class="{ disabledStyle: disabled }"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts" setup>
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
  }
});

defineEmits(['click']);
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
  // font-weight: 700;
  font-family: "pomo", Courier, monospace;
  // font-family: "pixelBlack";
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