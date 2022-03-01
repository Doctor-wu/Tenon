<template>
  <Animate class="delete-comp" ref="animator" :animate-name="animateName" :duration="animateTime">
    <section
      v-show="(displayDeletor || animating) && initd"
      @dragover.prevent="() => { }"
      @dragenter.prevent="() => { }"
      @drop="deleteDraggingComponent"
      class="entity"
    >
      <icon-delete style="font-size: 24px;" />
    </section>
  </Animate>
</template>
<script lang="ts" setup>
import { dragging, draggingMaterial, deleteDraggingComponent } from '~logic/viewer-drag';
import Animate from '@/components/shared/animate.vue';
import { ref } from 'vue';
import { computed, nextTick } from 'vue';

const animator = ref();
const animateName = ref("slide-to-left");
const animating = ref(false);
const animateTime = ref(300);
let initd = ref(false);

const displayDeletor = computed(() => {
  const isShow = (dragging.value && !draggingMaterial.value);
  if (isShow) {
    animateName.value = "slide-to-left";
    nextTick(() => {
      animator.value.run();
    });
  } else if (!draggingMaterial.value) {
    animating.value = true;
    animateName.value = "slide-to-right";
    nextTick(() => {
      animator.value.run();
    });
    setTimeout(() => {
      animating.value = false;
      initd.value = true;
    }, animateTime.value);
  }

  return isShow;
})
</script>
<style lang="scss" scoped>
.delete-comp {
  position: absolute;
  right: 0;
}

.entity {
  height: 60px;
  width: 60px;
  box-sizing: content-box;
  color: #f3f3f3;
  background-color: #f53f3f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 50%;
}
</style>