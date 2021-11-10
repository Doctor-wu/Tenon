<template>
  <section class="compose-view-container">
    <template v-if="config?.children?.length">
      <component v-for="comp in config.children" :is="comp.component"></component>
    </template>
    <slot v-else>
      <section class="default-tip">拖入物料以生成组件</section>
    </slot>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import { effect } from 'vue';
const store = useStore();

defineProps({
  config: {
    type: Object,
    default: () => { }
  },
});

effect(() => {

})

</script>
<style lang="scss" scoped>
.default-tip {
  text-align: center;
  padding: 20px;
  color: #77777799;
  border: 1px dashed #196ed7;
}
</style>
