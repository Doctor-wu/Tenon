<template>
    <component :is="toRaw(config.material.component)" :config="config" v-bind="config.props"></component>
</template>
<script setup lang="ts">
import { toRaw } from 'vue';
import Wrapper from './viewer/wrapper.vue';

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
});
</script>
<style>
</style>