<template>
  <section
    class="wrapper-container"
    :class="{
      hovering: dragging && hovering === ctx.config.id,
      editable: editMode,
      choosing: editMode
        && !dragging
        && choosingWrapper === ctx.config.id
        && !store?.getters['viewer/getDraggingComponent'],
      active: editMode && !dragging && store?.getters['viewer/getActiveComponent'] === ctx.config
    }"
    @dragstart.capture="(e) => handleMaterialDragStart(e, ctx, false)"
    @dragend="(e) => handleMaterialDragEnd(e, ctx)"
    @dragover.prevent="() => { }"
    @dragenter.prevent="() => { hovering = ctx.config.id }"
    @drop="(e) => handleWrapperDrop(e, ctx)"
    @mouseover.capture="() => choosingWrapper = config.id"
    @mouseleave="() => choosingWrapper = -1"
    @click="(e) => handleSelectComponent(e, ctx)"
    :draggable="editMode"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts" setup>
import { handleMaterialDragStart, handleMaterialDragEnd, handleWrapperDrop, dragging, hovering } from '../../logic/viewer-drag';
import { getCurrentInstance, ComponentInternalInstance, ref } from 'vue';
import { editMode } from '../../logic/viewer-status';
import { useStore } from '../../store';
import { choosingWrapper, handleSelectComponent } from '../../logic/viewer-select';
const store = useStore();
const instance = getCurrentInstance() as ComponentInternalInstance & {
  ctx: any;
};
const ctx = instance.ctx;

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});


</script>
<style lang="scss" scoped>
.wrapper-container.editable.hovering {
  border-bottom: 2px solid #00b42a;
}
.wrapper-container.editable {
  padding: 10px;
  background-color: #eee;
}

.wrapper-container.editable.choosing {
  outline: 2px dashed #1693ef;
  position: relative;
}

.wrapper-container.active {
  outline: 2px solid #9316ef;
}
.wrapper-container {
  background-color: #fff;
}
</style>