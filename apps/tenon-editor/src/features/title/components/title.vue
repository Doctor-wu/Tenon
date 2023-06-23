<template>
  <span class="title-wrapper">
    <span class="title">{{ title }}</span>
    <span class="sub-title">{{ subTitle }}</span>
  </span>
</template>
<script setup lang="ts">
import { ITitleFeature } from '..'
const { titleFeature } = defineProps<{
  title: string
  subTitle: string
  titleFeature: ITitleFeature
}>()
</script>
<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  height: 100%;
  padding-left: 6px;
}
.title {
  font-size: x-large;
}

.sub-title {
  font-size: medium;
  color: #777;
  margin-left: 6px;
  display: flex;
  align-self: flex-end;
  padding-bottom: 2px;
}
</style>
