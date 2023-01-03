<template>
  <section class="drawer-container" :style="computedStyle">
    <section
      v-if="drawerService[alignment].header.showHeader"
      class="drawer-header"
    >
      <section class="header-info">
        <span
          v-for="(layerName, index) in drawerService[alignment].layers.value"
        >
          {{ index > 0 ? ' / ' : '' }}{{ layerName }}
        </span>
      </section>
      <TButton
        aria-label="close-drawer"
        v-if="drawerService[alignment].header.showClose"
        @click="closeDrawer"
        variant="text"
        class="close-btn"
      >
        <TIcon name="close"></TIcon>
      </TButton>
    </section>
    <template v-for="item in layers">
      <Transition :class="computedClassName">
        <section
          class="drawer-layer"
          :key="item.name"
          :style="{
            zIndex: item.zIndex,
            marginTop: drawerService[alignment].header.showHeader
              ? '30px'
              : '0',
          }"
        >
          <component :is="item.renderer"></component>
        </section>
      </Transition>
    </template>
  </section>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, ref, VNode } from 'vue'
import { WorkbenchType } from '../../core'
import { DrawerService, DrawerServiceCore } from '../../services'

const props = defineProps<{
  alignment: 'left' | 'right'
}>()

const workbench = inject<WorkbenchType>('workbench')
const workbenchDIService = workbench!.workbenchDIService
const drawerService = workbenchDIService.getServiceInstance<DrawerServiceCore>(
  DrawerService,
)!

const visible = drawerService[props.alignment].visible

const computedClassName = [props.alignment]
const computedStyle = computed(() => [
  `${props.alignment}: ${visible.value ? '0' : '-320px'}`,
  `border-${props.alignment === 'left' ? 'right' : 'left'}: 1px solid #ddd`,
])

interface DrawerLayer {
  renderer: () => VNode
  name: string
  zIndex: number
}

const layers = ref<DrawerLayer[]>([])

const attachLayer = (name: string, renderer: () => VNode) => {
  layers.value.push({
    renderer,
    zIndex: layers.value.length + 1,
    name,
  })
}

const detachLayer = () => {
  layers.value.pop()
}

const clearLayer = () => {
  layers.value.length = 0
}

const closeDrawer = () => {
  clearLayer()
  drawerService[props.alignment].close(true)
}

onMounted(() => {
  drawerService[props.alignment].bridge.register('attachLayer', attachLayer)
  drawerService[props.alignment].bridge.register('detachLayer', detachLayer)
  drawerService[props.alignment].bridge.register('clearLayer', clearLayer)
})
</script>
<style lang="scss" scoped>
.drawer-container {
  position: absolute;
  width: 320px;
  background-color: #f8f8f8;
  top: 0;
  height: 100%;
  transition: all ease 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

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

.drawer-layer {
  position: absolute;
  height: 100%;
  width: 100%;
  flex: 1;
}

.header-info {
  white-space: nowrap;
  flex: 1;
  overflow: auto;
  text-align: left;
  position: relative;
}

.close-btn {
  height: 20px;
  width: 20px;
  padding: 0 3px;
  margin-left: 6px;
}

@keyframes fadeInFromLeft {
  0% {
    left: -150px;
    opacity: 0.3;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}

@keyframes fadeInFromRight {
  0% {
    right: -150px;
    opacity: 0.3;
  }

  100% {
    right: 0;
    opacity: 1;
  }
}

@keyframes fadeOutFromLeft {
  0% {
    left: 0;
    opacity: 1;
  }

  100% {
    left: -150px;
    opacity: 0.3;
  }
}

@keyframes fadeOutFromRight {
  0% {
    right: 0;
    opacity: 1;
  }

  100% {
    right: -150px;
    opacity: 0.3;
  }
}

.v-enter-active,
.v-leave-active {
  &.left {
    animation: fadeInFromLeft 0.3s ease-in-out;
  }

  &.right {
    animation: fadeInFromRight 0.3s ease-in-out;
  }
}

.v-enter-from,
.v-leave-to {
  &.left {
    animation: fadeOutFromLeft 0.3s ease-in-out;
  }

  &.right {
    animation: fadeOutFromRight 0.3s ease-in-out;
  }
}
</style>
