<template>
  <section class="icon-type-container">
    <section class="curr-selected">当前选中: {{ modelValue }}</section>
    <section class="icon-types">
      <section
        @click="() => setType(type)"
        class="type"
        :class="{ selected: type === modelValue }"
        v-for="type in Object.keys(IconTypes)"
      >
        <component :is="IconTypes[type]" size="22"></component>
        <span class="type-name">{{ type }}</span>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { IconTypes } from '@/logic/material-dependency';

const props = defineProps<{
  modelValue: string;
}>();
const $emit = defineEmits(['update:modelValue']);

const setType = (type) => {
  $emit('update:modelValue', type);
}

</script>
<style lang="scss" scoped>
.icon-type-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.icon-types {
  margin-top: 12px;
  display: flex;
  transition: background 0.3s ease;
  user-select: none;
  cursor: pointer;
  flex-wrap: wrap;
  gap: 6px;
}

.type {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: 75px;
  box-sizing: border-box;
  &:hover {
    background-color: #f3f3f3;
  }
  &.selected {
    color: #337df3;
  }
}

.type-name {
  margin-top: 8px;
  font-size: 12px;
}
</style>