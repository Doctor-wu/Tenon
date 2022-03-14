<template>
  <section class="scale-container">
    <section class="scale-value">{{ Number(store.getters['viewer/scale']).toFixed(2) }}x</section>
    <section class="operate">
      <TextButton :disabled="disableUp" class="animate-extra" @click="upScale">
        <icon-caret-up class="operate-icon" />
      </TextButton>
      <TextButton :disabled="disableDown" class="animate-extra" @click="downScale">
        <icon-caret-down class="operate-icon" />
      </TextButton>
    </section>
  </section>
</template>
<script setup lang="ts">
import TextButton from '@/components/shared/text-button.vue';
import { useStore } from '@/store';
import { computed } from 'vue';

const store = useStore();

const disableUp = computed(() => store.getters['viewer/scale'] === 2);
const disableDown = computed(() => store.getters['viewer/scale'] === .25);

const upScale = () => {
  store.dispatch('viewer/setScale', store.getters['viewer/scale'] + .25);
}
const downScale = () => {
  store.dispatch('viewer/setScale', store.getters['viewer/scale'] - .25);
}
</script>
<style lang="scss" scoped>
.scale-container {
  display: flex;
  align-items: center;
  margin-left: 10px;

  .animate-extra {
    padding: 2px 0;
    display: flex;
    align-items: center;
  }

  .scale-value {
    font-family: "pomo", Courier, monospace;
    font-size: 21px;
    flex: 0.8;
    padding: 5px 0;
  }

  .operate {
    display: flex;
    flex-direction: column;
    flex: 0.2;
  }

  .operate-icon {
    font-size: 12px;
    padding: 0 12px;
  }
}
</style>