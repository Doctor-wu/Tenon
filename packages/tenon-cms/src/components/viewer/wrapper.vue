<template>
  <section
    class="wrapper-container"
    :class="{
      hovering: dragging && hovering === config.id,
      editable: editMode,
      choosing: editMode
        && !dragging
        && choosingWrapper === config.id
        && !store?.getters['viewer/getDraggingComponent'],
      active: editMode && !dragging && store?.getters['viewer/getActiveComponent'] === config
    }"
    @dragstart.capture="(e) => handleMaterialDragStart(e, config, false)"
    @dragend="(e) => handleMaterialDragEnd(e, config)"
    @dragover.prevent="() => { }"
    @dragenter.prevent="() => { hovering = config.id }"
    @drop="(e) => handleWrapperDrop(e, config)"
    @mouseover.capture="() => choosingWrapper = config.id"
    @mouseleave="() => choosingWrapper = -1"
    @click="(e) => handleSelectComponent(e, config)"
    :draggable="editMode"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts" setup>
import { handleMaterialDragStart, handleMaterialDragEnd, handleWrapperDrop, dragging, hovering } from '../../logic/viewer-drag';
import { editMode } from '../../logic/viewer-status';
import { useStore } from '../../store';
import { choosingWrapper, handleSelectComponent } from '../../logic/viewer-select';
const store = useStore();

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
  // padding: 10px;
  background-color: #eee;
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
  background-color: #fff;
}
</style>