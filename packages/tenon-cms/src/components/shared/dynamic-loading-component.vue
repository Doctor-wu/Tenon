<template>
  <section v-if="!loaded && prefixWait" class="loading-container">
    <a-spin></a-spin>
  </section>
  <template v-else-if="loaded">
    <component :is="markRaw(componentEntity)"></component>
  </template>
</template>
<script setup lang="ts">
import { ref, shallowRef, markRaw } from 'vue';

const props = defineProps({
  componentFactory: {
    type: Function,
    required: true,
  },
});

const componentEntity = shallowRef();
const loaded = ref(false);
const prefixWait = ref(false);
setTimeout(() => {
  prefixWait.value = true;
}, 50);

props.componentFactory().then((component) => {
  componentEntity.value = component.default;
  loaded.value = true;
});

</script>
<style lang="scss" scoped>
.loading-container {
  // width: 100%;
  // height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>