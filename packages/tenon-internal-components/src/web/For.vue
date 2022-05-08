<template>
  <template v-for="(item, index) in internalLoop" :key="getKeyByItem(item, index)">
    <ComposeView
      :isSlot="index === 0"
      :attach="index !== 0"
      slotKey="__loop__"
      :tenonCompProps="{...tenonCompProps, item, index}"
      :composeLayout="composeLayout"
      :composeBackground="composeBackground"
      :childrenBucket="childrenBucket"
      :disabled="index !== 0"
    ></ComposeView>
  </template>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import { TenonComponent } from '@tenon/engine';

const props = defineProps<{
  loop: any[];
  composeLayout: any;
  composeBackground: any;
  tenonCompProps: any;
}>();

const materialsMap = TenonComponent.materialsMap;
const factory = materialsMap.get('Compose-View')!;
const material = factory();
const ComposeView = material.component;

function getKeyByItem(item, index) {
  if(item === undefined || item === null) return index;
  switch (typeof item) {
    case "number":
    case "string":
      return `${item}-${index}`;
    case "object":
      return `${item.id || index}-${index}`;
    default:
      break;
  }
}

const internalLoop = computed(() => {
  try {
    if (Array.isArray(Array.from(props.loop || []))) return Array.from(props.loop || []);
  } catch (e) {
    Message.error(`[Array Type Error], ${e}`);
    return [1];
  }
});
const childrenBucket = { value: undefined };
</script>

<style lang="scss" scoped>
</style>