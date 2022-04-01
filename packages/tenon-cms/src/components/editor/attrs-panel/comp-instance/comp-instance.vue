<template>
  <section class="comp-instance-attr-container">
    <a-empty v-if="activeComponent?.material?.config.setup === 'native'">该组件为内部组件</a-empty>
    <template v-else>
      <a-card title="States">
        <pre style="overflow: auto;max-height: 250px;">{{ JSON.stringify(activeComponent.states?.states, null, 2) }}</pre>
      </a-card>
      <a-card title="tenonCompProps" style="margin: 20px 0;">
        <pre style="overflow: auto;max-height: 250px;">{{ JSON.stringify(activeComponent.ctx?.tenonCompProps, null, 2) }}</pre>
      </a-card>
      <a-list style="margin: 20px 0;">
        <template #header>Handlers</template>
        <a-list-item v-for="(item, key) in activeComponent.handlers" :key="key">
          <section class="instance-handler-item">
            <b>{{ item.toUpperCase() }}</b>
            <icon-play-arrow-fill @click="() => simulateTrigger(item)" class="trigger" />
          </section>
        </a-list-item>
        <a-empty
          style="flex-direction: column;"
          v-if="!activeComponent.handlers?.length"
        >该组件暂无Handler</a-empty>
      </a-list>
    </template>
  </section>
</template>
<script setup lang="ts">
import { useStore } from '@/store';
import { computed, ref } from 'vue';
import { TenonComponent } from '@tenon/engine';

const store = useStore();
const activeComponent = computed<TenonComponent>(() => store.getters['viewer/getActiveComponent']);
console.log(activeComponent.value);

const simulateTrigger = (item: string) => {
  const handler = activeComponent.value?.states?.[item];
  
  handler && handler();
}

</script>
<style lang="scss" scoped>
.instance-handler-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  user-select: none;

  .trigger {
    font-size: 24px;
    color: gray;
    cursor: pointer;
    padding: 5px;
    transition: color 0.2s ease-out;
    &:hover {
      color: lightgreen;
    }
  }
}
</style>