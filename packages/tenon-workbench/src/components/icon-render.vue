<template>
  <TIcon
    v-if="loading"
    name="loading"
    :size="(icon.iconSize || 16) + 'px'"
  ></TIcon>
  <component v-else-if="icon?.iconRender" :is="icon?.iconRender"></component>
  <TIcon
    v-else-if="icon"
    :name="icon.iconName"
    :size="(icon.iconSize || 16) + 'px'"
  ></TIcon>
</template>
<script setup lang="ts">
import { IconConfig } from '../interfaces'

defineProps<{
  icon: IconConfig
  loading?: boolean
}>()
</script>
<style lang="scss" scoped></style>
