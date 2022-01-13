<template>
  <component :is="is" v-bind="$attrs"></component>
</template>
<script lang="ts" setup>
defineProps({
  is: {
    type: String,
    required: true,
  }
})
</script>