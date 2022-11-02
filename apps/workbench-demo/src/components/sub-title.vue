<template>
  <span class="title"> {{ text }} </span>
</template>
<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>
<style lang="scss" scoped>
.title {
  font-size: medium;
  vertical-align: -1px;
  color: #777;
  margin-left: 6px;
}
</style>
