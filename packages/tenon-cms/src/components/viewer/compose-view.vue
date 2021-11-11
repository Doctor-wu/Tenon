<template>
  <section class="compose-view-container">
    <template v-if="config?.children?.length">
      <Wrapper v-for="comp in config.children" :config="comp">
        <component :is="toRaw(comp.component)" :config="comp"></component>
      </Wrapper>
    </template>
    <section v-else class="default-tip">拖入物料以生成组件</section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import { effect, toRaw } from 'vue';
import Wrapper from './wrapper.vue';
const store = useStore();

const props = defineProps({
  config: {
    type: Object,
    default: () => []
  },
});
console.log(props);


effect(() => {

})

</script>
<style lang="scss" scoped>
.compose-view-container {
}
.default-tip {
  text-align: center;
  padding: 20px;
  color: #77777799;
  border: 1px dashed #196ed7;
}
</style>
