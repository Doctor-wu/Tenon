<template>
  <component :is="renderList"></component>
</template>
<script setup lang="ts">
import { computed, h, reactive } from 'vue';
import { useStore } from 'vuex';
import { Message } from '@arco-design/web-vue';

const props = defineProps<{
  loop: any[];
  composeLayout: any;
  composeBackground: any;
}>();

const internalLoop = computed(() => {
  try {
    if (Array.isArray(Array.from(props.loop))) return Array.from(props.loop);
  } catch (e) {
    Message.error(`[Array Type Error], ${e}`);
    return [1];
  }
});

const renderList = computed(() => {
  const childrenBucket = { value: undefined };
  return () => internalLoop.value?.map((item, index) => {
    const store = useStore();
    const materialsMap = store.getters['materials/getMaterialsMap'];
    const factory = materialsMap.get('Compose-View');
    const material = factory();
    return h(material.component, {
      isSlot: index === 0,
      attach: index !==0,
      slotKey: `__loop__`,
      tenonCompProps: reactive({
        item,
        index,
      }),
      composeLayout: props.composeLayout,
      composeBackground: props.composeBackground,
      childrenBucket,
      disabled: index !== 0,
    });
  });
});

</script>

<style lang="scss" scoped>
</style>