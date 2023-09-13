<template>
  <section
    v-if="(store.getters['layout/isLoading'] || !loaded) && prefixWait"
    class="loading-container"
  >
    <a-spin></a-spin>
  </section>
  <template v-else-if="(!store.getters['layout/isLoading'] && loaded)">
    <component :is="markRaw(toRaw(componentEntity))"></component>
  </template>
</template>
<script setup lang="ts">
import { useStore } from '@/store';
import { ref, shallowRef, markRaw, toRaw, onBeforeMount, watch } from 'vue';

const props = defineProps({
  componentFactory: {
    type: Function,
    required: true,
  },
});

const componentEntity = shallowRef();
const loaded = ref(false);
const prefixWait = ref(false);
const store = useStore();

prefixWait.value = false;
setTimeout(() => {
  prefixWait.value = true;
}, 100);

props.componentFactory().then((component) => {
  componentEntity.value = component.default;
  loaded.value = true;
});

</script>
<style lang="scss" scoped>
.loading-container {
  display: block;
  // width: 100%;
  // height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>