<template>
  <section class="scale-container">
    <section class="scale-value">
      <AnimateButton info="恢复缩放" @click="clearScale">
        <section style="display: flex; align-items: center;">
          <icon-search size="18" class="nav-item-icon" style="margin-right: 5px;"/>
          <span>{{ Number(store.getters['viewer/scale']).toFixed(2) }}x</span>
        </section>
      </AnimateButton>
    </section>
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
import AnimateButton from '@/components/shared/animate-button.vue';

const store = useStore();

const disableUp = computed(() => store.getters['viewer/scale'] === 2);
const disableDown = computed(() => store.getters['viewer/scale'] === .25);

const upScale = () => {
  store.dispatch('viewer/setScale', store.getters['viewer/scale'] + .25);
}
const downScale = () => {
  store.dispatch('viewer/setScale', store.getters['viewer/scale'] - .25);
}

const clearScale = () => {
  store.dispatch('viewer/setScale', 1);
}
</script>
<style lang="scss" scoped>
.scale-container {
  display: inline-flex;
  align-items: center;
  justify-self: flex-end;
  vertical-align: sub;

  .animate-extra {
    padding: 0;
    display: flex;
    align-items: center;
  }

  .scale-value {
    font-family: "pomo", Courier, monospace;
    font-size: 21px;
    flex: 0.8;
    padding: 5px 0;
    user-select: none;
  }

  .operate {
    display: flex;
    flex-direction: column;
  }

  .operate-icon {
    font-size: 12px;
    padding: 0 6px;
  }
}
</style>