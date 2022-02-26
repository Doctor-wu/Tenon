<template>
  <section
    class="compose-view-container"
    :style="[
      ($attrs as any).composeLayout || {},
      ($attrs as any).composeBackground || {},
      ($attrs as any).composeTextStyle || {}
    ]"
    :class="{ dropable: store?.getters['viewer/getHoveringComponent'] === propsConfig, editable: editMode }"
    @dragenter="(e) => handleContainerDropEnter(e, propsConfig)"
    @dragover.prevent="() => { }"
    @drop="(e) => handleContainerDrop(e, propsConfig)"
  >
    <template v-if="propsConfig?.children?.length">
      <template v-for="subConfig in propsConfig.children" :key="subConfig.id">
        <Wrapper
          :style="[subConfig?.props?.containerStyle, subConfig?.props?.containerBackground]"
          :tenonComp="subConfig"
        >
          <component
            :is="toRaw(subConfig.material.component)"
            :tenonComp="subConfig"
            v-bind="subConfig.props"
          ></component>
        </Wrapper>
      </template>
    </template>
    <section v-else-if="editMode" class="default-tip">{{ placeholder }}</section>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { toRaw, computed, getCurrentInstance } from 'vue';
import Wrapper from '~components/editor/viewer/wrapper.vue';
import { handleContainerDropEnter, handleContainerDrop } from '~logic/viewer-drag';
import { editMode } from '~logic/viewer-status';
import { createTenonComponent } from '@tenon/engine';
import { findParentTenonComp } from '@tenon/materials';

const store = useStore();

const props = defineProps({
  tenonComp: {
    type: [Object, Function],
    default: () => { }
  } as any,
  isSlot: {
    type: Boolean,
    default: false,
  },
  slotKey: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "拖入物料以生成组件"
  },
  tenonProps: {
    type: Object
  }
});

let propsConfig: any = computed(() => {
  let result: any = props.tenonComp;
  const instance: any = getCurrentInstance();
  if (props.isSlot) { 
    const rootComp = findParentTenonComp(instance)!;
    const rootSlots = rootComp.slots;
    if (rootSlots[props.slotKey]) {
      result = rootSlots[props.slotKey];
    } else {
      const materialsMap = store.getters['materials/getMaterialsMap'];
      const materialFactory = materialsMap.get("Compose-View");
      const material = materialFactory();
      const comp = createTenonComponent(material, rootComp);
      comp.isSlot = true;
      result = comp;
      rootSlots[props.slotKey] = comp;
    }
  }
  result.ctx = result.ctx || instance.ctx;
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
  height: 40px;
  margin: auto;
  text-align: center;
  color: #77777799;
  background-color: #ffffff99;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
