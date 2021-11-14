<template>
  <section class="attrs-wrapper">
    <section class="header">
      <b>{{ activeComponent.name }}</b>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import { computed, effect } from 'vue';

const store = useStore();
const activeComponent = computed(() => store.getters['viewer/getActiveComponent']);
const map = computed(() => store.getters['materials/getMaterialsMap']);
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>