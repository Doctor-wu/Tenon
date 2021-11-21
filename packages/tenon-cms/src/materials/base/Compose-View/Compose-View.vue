<template>
  <section
    class="compose-view-container"
    :style="[($attrs as any).composeLayout || {}, ($attrs as any).composeBackground || {}]"
    :class="{ dropable: store?.getters['viewer/getHoveringComponent'] === propsConfig, editable: editMode }"
    @dragenter="(e) => handleContainerDropEnter(e, propsConfig)"
    @dragover.prevent="() => { }"
    @drop="(e) => handleContainerDrop(e, propsConfig)"
  >
    <template v-if="propsConfig.children?.length">
      <template v-for="subConfig in propsConfig.children" :key="subConfig.id">
        <Wrapper
          :style="[subConfig?.props?.containerStyle, subConfig?.props?.containerBackground]"
          :config="subConfig"
        >
          <component
            :is="toRaw(subConfig.material.component)"
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
import { toRaw, computed, onMounted } from 'vue';
import Wrapper from '../../../components/viewer/wrapper.vue';
import { handleContainerDropEnter, handleContainerDrop } from '../../../logic/viewer-drag';
import { editMode } from '../../../logic/viewer-status';
import { createTenonEditorComponentByMaterial } from '../../../logic/tree-operation';
import { MaterialComponentContext } from '../../../logic/setup-component-context';

const store = useStore();

const props = defineProps({
  config: {
    type: [Object, Function],
    default: () => { }
  },
  isSlot: {
    type: Boolean,
    default: false,
  },
  slotKey: {
    type: String,
    default: ""
  }
});
let propsConfig: any = computed(() => {
  let result: any = props.config;
  if (props.isSlot) {
    const rootComp = MaterialComponentContext.value.$attrs.config;
    const rootSlots = rootComp.slots;
    if (rootSlots[props.slotKey]) {
      result = rootSlots[props.slotKey];
    } else {
      const materialsMap = store.getters['materials/getMaterialsMap'];
      const materialFactory = materialsMap.get("Compose-View");
      const material = materialFactory();
      const comp = createTenonEditorComponentByMaterial(material, rootComp);
      comp.isSlot = true;
      result = comp;
      rootSlots[props.slotKey] = comp;
    }
  }
  return result;
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
