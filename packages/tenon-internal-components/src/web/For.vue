<template>
  <component :is="renderList"></component>
</template>
<script setup lang="ts">
import { computed, h, reactive } from 'vue';
import { useStore } from 'vuex';
import { Message } from '@arco-design/web-vue';
const store = useStore();

const props = defineProps<{
  loop: any[];
  composeLayout: any;
  composeBackground: any;
}>();

const internalLoop = computed(() => {
  try {
    if (Array.isArray(Array.from(props.loop || []))) return Array.from(props.loop || []);
  } catch (e) {
    Message.error(`[Array Type Error], ${e}`);
    return [1];
  }
});

const renderList = computed(() => {
  const loop = internalLoop.value;
  console.log(loop);
  const childrenBucket = { value: undefined };
  return () => loop?.map((item, index) => {
    const materialsMap = store.getters['materials/getMaterialsMap'];
    const factory = materialsMap.get('Compose-View');
    const material = factory();
    const vnode =  h(material.component, {
      key: item,
      isSlot: index === 0,
      attach: index !==0,
      slotKey: `__loop__`,
      tenonCompProps: {
        item,
        index,
      },
      composeLayout: props.composeLayout,
      composeBackground: props.composeBackground,
      childrenBucket,
      // useTeleport: true,
      disabled: index !== 0,
    });

    console.log(vnode);
    return vnode;
  });
});

</script>

<style lang="scss" scoped>
</style>