<template>
  <section class="drawer-container" :style="computedStyle">
    <section v-if="drawerService[alignment].header.value.showHeader" class="drawer-header">
      <span v-for="(layerName, index) in drawerService[alignment].layers.value">
        {{index > 0 ? ' / ' :''}}{{layerName}}
      </span>
      <Button v-if="drawerService[alignment].header.value.showClose" @click="closeDrawer" variant="text"
        class="close-btn">
        <Icon name="close"></Icon>
      </Button>
    </section>
    <template v-for="(item) in layers">
      <Transition :class="computedClassName">
        <section class="drawer-layer" :key="item.name" :style="{zIndex: item.zIndex}">
          <component :is="item.renderer"></component>
        </section>
      </Transition>
    </template>
  </section>
</template>
<script setup lang="ts">
import { Button, Icon } from 'tdesign-vue-next';
import { computed, inject, onMounted, ref, VNode } from 'vue';
import { WorkbenchType } from '../../core';
import { DrawerService, DrawerServiceCore } from '../../services';

const props = defineProps<{
  alignment: 'left' | 'right'
}>();

const workbench = inject<WorkbenchType>('workbench');
const workbenchDIService = workbench!.workbenchDIService;
const drawerService = workbenchDIService.getServiceInstance<DrawerServiceCore>(DrawerService)!;

const visible = drawerService[props.alignment].visible;

const computedClassName = [
  props.alignment,
];
const computedStyle = computed(() => [
  `${props.alignment}: ${visible.value ? '0' : '-320px'}`,
  `border-${(props.alignment === 'left') ? 'right' : 'left'}: 1px solid #ddd`
]);

interface DrawerLayer {
  renderer: () => VNode;
  name: string;
  zIndex: number;
}

const layers = ref<DrawerLayer[]>([]);

const attachLayer = (name: string, renderer: () => VNode) => {
  layers.value.push({
    renderer,
    zIndex: layers.value.length + 1,
    name,
  });
}

const detachLayer = () => {
  layers.value.pop();
};

const clearLayer = () => {
  layers.value.length = 0;
};

const closeDrawer = () => {
  clearLayer();
  drawerService[props.alignment].close();
}

onMounted(() => {
  drawerService[props.alignment].bridge.register('attachLayer', attachLayer);
  drawerService[props.alignment].bridge.register('detachLayer', detachLayer);
  drawerService[props.alignment].bridge.register('clearLayer', clearLayer);
});
</script>
<style lang="scss" scoped>
.drawer-container {
  position: absolute;
  width: 320px;
  background-color: #f8f8f8;
  top: 0;
  height: 100%;
  transition: all ease .3s;
  overflow: hidden;
}

.drawer-layer {
  position: absolute;
  height: 100%;
  width: 100%;
}

;

.drawer-header {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
}

.close-btn {
  height: 24px;
  padding: 0 3px;
}

@keyframes fadeInFromLeft {
  0% {
    left: -150px;
    opacity: .3;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}

;

@keyframes fadeInFromRight {
  0% {
    right: -150px;
    opacity: .3;
  }

  100% {
    right: 0;
    opacity: 1;
  }
}

;

@keyframes fadeOutFromLeft {
  0% {
    left: 0;
    opacity: 1;
  }

  100% {
    left: -150px;
    opacity: .3;
  }
}

@keyframes fadeOutFromRight {
  0% {
    right: 0;
    opacity: 1;
  }

  100% {
    right: -150px;
    opacity: .3;
  }
}

.v-enter-active,
.v-leave-active {
  &.left {
    animation: fadeInFromLeft .3s ease-in-out;
  }

  &.right {
    animation: fadeInFromRight .3s ease-in-out;
  }
}

.v-enter-from,
.v-leave-to {
  &.left {
    animation: fadeOutFromLeft .3s ease-in-out;
  }

  &.right {
    animation: fadeOutFromRight .3s ease-in-out;
  }
}
</style>