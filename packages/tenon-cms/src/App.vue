<template>
  <component :is="store.getters['layout/getActiveLayout']" />
</template>

<script setup lang="ts">
import { useStore } from '@/store';
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const store = useStore();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>
