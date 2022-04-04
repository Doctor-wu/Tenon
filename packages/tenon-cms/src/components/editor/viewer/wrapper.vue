<template>
  <section
    class="wrapper-container"
    :class="{
      hovering: dragging && hovering === tenonComp.id,
      editable: editMode,
      choosing: editMode
        && !dragging
        && choosingWrapper === tenonComp.id
        && !store?.getters['viewer/getDraggingComponent'],
      active: editMode && !dragging && store?.getters['viewer/getActiveComponent'] === tenonComp
    }"
    v-if="shouldRender"
    @dragstart.capture="(e) => handleMaterialDragStart(e, tenonComp, false)"
    @dragend="(e) => handleMaterialDragEnd(e, tenonComp)"
    @dragover.prevent="() => { }"
    @dragenter.prevent="() => { hovering = tenonComp.id }"
    @drop="(e) => handleWrapperDrop(e, tenonComp)"
    @mouseover.capture="() => choosingWrapper = tenonComp.id"
    @mouseleave="() => choosingWrapper = -1"
    @click="(e) => handleSelectComponent(e, tenonComp)"
    :draggable="editMode"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts" setup>
import { handleMaterialDragStart, handleMaterialDragEnd, handleWrapperDrop, dragging, hovering } from '~logic/viewer-drag';
import { editMode } from '~logic/viewer-status';
import { useStore } from '@/store';
import { computed } from 'vue';
import { choosingWrapper, handleSelectComponent } from '~logic/viewer-active-component';
import { TenonComponent } from '@tenon/engine';
const store = useStore();

const props = defineProps<{
  tenonComp: TenonComponent
}>();

const shouldRender = computed(() => {
  if(props.tenonComp.name !== 'If') return true;
  if(!editMode.value && !props.tenonComp.props.IfConfig.render) return false;
  return true;
});


</script>
<style lang="scss" scoped>
.wrapper-container.editable.hovering {
  border-bottom: 2px solid #00b42a;
}
.wrapper-container.editable {
  padding: 2px;
  // background-color: #eee;
  border: 1px dashed #ccc;
}

.wrapper-container.editable.choosing {
  outline: 2px dashed #1693ef;
  position: relative;
  z-index: 1;
}

.wrapper-container.active {
  outline: 2px solid #9316ef;
  position: relative;
}
.wrapper-container {
}
</style>