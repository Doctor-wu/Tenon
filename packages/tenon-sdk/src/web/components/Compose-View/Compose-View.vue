<template>
  <section v-if="!(!editMode && !tenonTreeNode?.children?.length)" class="compose-view-container" ref="selfRef" :style="[
    ($attrs as any).composeLayout || {},
    ($attrs as any).composeBackground || {},
    ($attrs as any).composeTextStyle || {},
    ((tenonTreeNode?.children?.length && useTeleport) || !(editMode || tenonTreeNode?.children?.length))
      ? { display: 'none' }
      : {},
  ]">
    <template v-if="tenonTreeNode?.children?.length">
      <teleport v-if="useTeleport && selfRef" :to="selfRef?.parentElement">
        <template v-for="subTreeNode in tenonTreeNode.children" :key="subTreeNode.id">
          <Wrapper :style="[subTreeNode?.props?.containerStyle, subTreeNode?.props?.containerBackground]"
            :tenonComp="subTreeNode">
            <component :is="toRaw(subTreeNode.material.component)" v-bind="subTreeNode.props" :tenonComp="subTreeNode"
              :tenonCompProps="tenonCompProps"></component>
          </Wrapper>
        </template>
      </teleport>
      <template v-else>
        <template v-for="subTreeNode in tenonTreeNode.children" :key="subTreeNode.id">
          <Wrapper :style="[subTreeNode?.props?.containerStyle, subTreeNode?.props?.containerBackground]"
            :tenonComp="subTreeNode">
            <component :is="toRaw(subTreeNode.material.component)" v-bind="subTreeNode.props" :tenonComp="subTreeNode"
              :tenonCompProps="tenonCompProps"></component>
          </Wrapper>
        </template>
      </template>
    </template>
    <section v-else-if="editMode" class="default-tip">{{ placeholder }}</section>
    <section v-if="disabled && editMode" class="disable-mask" @dragenter.stop="() => { }" @dragover.stop="() => { }"
      @drop.stop="() => { }"></section>
  </section>
</template>

<script lang="ts" setup>
import {
  toRaw,
  computed,
  getCurrentInstance,
  ComputedRef,
  onMounted,
  watchEffect,
  ref,
  onBeforeUnmount,
} from 'vue';
import Wrapper from '../wrapper.vue';
import { createTenonComponent, LifeCycleHooksKey, TenonComponent } from '@tenon/engine';
import { findParentTenonComp } from '@tenon/materials';

const selfRef = ref<HTMLElement>();

// const store = useStore();

const props = defineProps({
  tenonComp: {
    type: [Object, Function],
    default: () => ({}),
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
  tenonCompProps: {
    type: Object,
    default: () => ({}),
  },
  attach: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  useTeleport: {
    type: Boolean,
    default: false
  }
});
const instance: any = getCurrentInstance();
let tenonTreeNode: ComputedRef<TenonComponent> = computed<TenonComponent>(() => {
  let result: any = props.tenonComp;
  if (props.isSlot) {
    const rootComp = findParentTenonComp(instance)!;
    // if(!rootComp) return;
    const rootSlots = rootComp?.slots;
    if (rootSlots?.[props.slotKey]) {
      result = rootSlots[props.slotKey];
    } else {
      const materialsMap = TenonComponent.materialsMap;
      const materialFactory = materialsMap.get("Compose-View")!;
      const material = materialFactory();
      const comp = createTenonComponent(material, rootComp);
      comp.isSlot = true;
      result = comp;
      rootSlots[props.slotKey] = comp;
    }
  } else if (props.attach) {
    const rootComp = findParentTenonComp(instance)!;
    const materialsMap = TenonComponent.materialsMap;
    const materialFactory = materialsMap.get("Compose-View")!;
    const material = materialFactory();
    const comp = createTenonComponent(material, rootComp);
    result = comp;
  }
  result.ctx = result.ctx || instance.ctx;
  result.ctx.tenonComp = result;
  result.vueInstance = result.vueInstance || instance;

  return result;
});

onMounted(() => {
  tenonTreeNode.value.lifecycleHook.executeHook(LifeCycleHooksKey.onMounted);
});
onBeforeUnmount(() => {
  tenonTreeNode.value.lifecycleHook.executeHook(LifeCycleHooksKey.onBeforeUnmount);
});

if (instance.attrs.childrenBucket) {
  if (!instance.attrs.childrenBucket.value) {
    instance.attrs.childrenBucket.value = tenonTreeNode.value.children;
  } else {
    tenonTreeNode.value.children?.forEach(c => c.destroy());
    tenonTreeNode.value.children = instance.attrs.childrenBucket.value.map(i => {
      const cInstance = i.clone();
      // 防止If组件render为false直接不渲染
      if (cInstance.props.IfConfig) cInstance.props.IfConfig.render = true;
      return cInstance;
    });
  }
}
</script>
<style lang="scss" scoped>
.compose-view-container {
  position: relative;
  width: 100%;
}

.disable-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff77;
  z-index: 1;
}

.compose-view-container.editable {
  min-height: 20px;
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
  height: 20px;
  margin: auto;
  text-align: center;
  color: #77777799;
  background-color: #ffffff99;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
