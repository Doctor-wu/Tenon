<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <!-- <keep-alive>
        <component :is="markRaw(Component)" v-if="$route.meta.keepAlive" />
      </keep-alive> -->
      <component :is="markRaw(Component)" />
    </template>
  </router-view>
</template>

<script setup lang="ts">
import { markRaw, shallowRef } from 'vue';
</script>