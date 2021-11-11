<template>
  <section
    class="compose-view-container"
    :class="{ dropable: store.getters['viewer/getHoveringComponent'] === config }"
    @dragenter="(e) => handleContainerDropEnter(e, ctx)"
    @dragover.prevent="() => { }"
    @drop="(e) => handleContainerDrop(e, ctx)"
  >
    <template v-if="config?.children?.length">
      <Wrapper v-for="comp in config.children">
        <component :is="toRaw(map.get(comp.name)().component)" :config="comp"></component>
      </Wrapper>
    </template>
    <section v-else class="default-tip">拖入物料以生成组件</section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import { toRaw, getCurrentInstance, ComponentInternalInstance } from 'vue';
import Wrapper from './wrapper.vue';
import { handleContainerDropEnter, handleContainerDrop } from '../../logic/viewer-drag';

const instance = getCurrentInstance() as ComponentInternalInstance & {
  ctx: any;
};
const ctx = instance.ctx;
const store = useStore();
const map = store.getters['materials/getMaterialsMap'];

const props = defineProps({
  config: {
    type: Object,
    default: () => []
  },
});
console.log(props.config);


</script>
<style lang="scss" scoped>
.compose-view-container {
  min-height: 40px;
  border: 1px dashed #ccc;
  position: relative;
}
.compose-view-container.dropable {
  border: 1px dashed red;
}
.default-tip {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  color: #77777799;
  // border: 1px dashed #196ed7;
  background-color: #ffffff99;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
