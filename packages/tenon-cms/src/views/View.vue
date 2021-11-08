<template>
  <div>View, {{store.state.author}}</div>
</template>
<script setup lang="ts">
import { useStore } from '../store';

const store = useStore();
</script>
<style lang="scss" scoped>
  
</style>