<template>
  <section
    class="compose-view-container"
    :style="($attrs as any).composeStyle || {}"
    :class="{ dropable: store?.getters['viewer/getHoveringComponent'] === config, editable: editMode }"
    @dragenter="(e) => handleContainerDropEnter(e, config)"
    @dragover.prevent="() => { }"
    @drop="(e) => handleContainerDrop(e, config)"
  >
    <template v-if="config.children?.length">
      <template v-for="subConfig in config.children" :key="subConfig.id">
        <Wrapper :style="subConfig?.props?.containerStyle" :config="subConfig">
          <component
            :is="toRaw(store.getters['materials/getMaterialsMap'].get(subConfig.name)().component)"
            :config="subConfig"
            v-bind="subConfig.props"
          ></component>
        </Wrapper>
      </template>
    </template>
    <section v-else-if="editMode" class="default-tip">拖入物料以生成组件</section>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from '../../../store';
import { toRaw } from 'vue';
import Wrapper from '../../../components/viewer/wrapper.vue';
import { handleContainerDropEnter, handleContainerDrop } from '../../../logic/viewer-drag';
import { editMode } from '../../../logic/viewer-status';

const store = useStore();

const props = defineProps({
  config: {
    type: Object,
    default: () => { }
  },
});

</script>
<style lang="scss" scoped>
.compose-view-container {
  position: relative;
  width: 100%;
}
.compose-view-container.editable {
  min-height: 40px;
}
.compose-view-container.editable.dropable {
  outline: 1px dashed red;
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
  background-color: #ffffff99;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
