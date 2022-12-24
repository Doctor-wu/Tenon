<template>
  <span class="title-wrapper">
    <span class="title"> {{ title }} </span>
    <span class="sub-title"> {{ subTitle }} </span>
  </span>
</template>
<script setup lang="ts">
  defineProps<{
    title: string;
    subTitle: string;
  }>();
</script>
<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  height: 100%;
  padding-left: 6px;
}
.title {
  font-size: x-large;
};

.sub-title {
  font-size: medium;
  color: #777;
  margin-left: 6px;
  display: flex;
  align-self: flex-end;
  padding-bottom: 2px;
}
</style>
