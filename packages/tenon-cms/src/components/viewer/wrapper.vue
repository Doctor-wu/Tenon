<template>
  <section
    class="wrapper-container"
    :class="{ hovring: dragging && hovering === ctx.comp.id }"
    @dragstart.capture="(e) => handleMaterialDragStart(e, ctx, false)"
    @dragend="(e) => handleMaterialDragEnd(e, ctx)"
    @dragover.prevent="() => { }"
    @dragenter.prevent="() => { hovering = ctx.comp.id }"
    @drop="(e) => handleWrapperDrop(e, ctx)"
    :draggable="editMode"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts" setup>
import { handleMaterialDragStart, handleMaterialDragEnd, handleWrapperDrop, dragging, hovering } from '../../logic/viewer-drag';
import { getCurrentInstance, ComponentInternalInstance, computed } from 'vue';
import { editMode } from '../../logic/viewer-status';
const instance = getCurrentInstance() as ComponentInternalInstance & {
  ctx: any;
};
const ctx = instance.ctx;

const props = defineProps({
  comp: {
    type: Object,
    required: true,
  },
});

const distance = computed(() => {
  return editMode.value ? '5px' : '0px';
});
const bgc = computed(() => {
  return editMode.value ? '#eee' : '#fff';
});

</script>
<style lang="scss" scoped>
.wrapper-container.hovring {
  border-bottom: 2px solid #1693ef;
}
.wrapper-container {
  padding: v-bind("distance");
  background-color: v-bind("bgc");
}
</style>