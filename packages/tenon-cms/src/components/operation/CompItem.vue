<template>
  <section class="comp-item-container">
    <section>
      <component v-if="comp.config.icon" :is="'icon-' + comp.config.icon" />
      {{ comp.name }}
    </section>
    <section v-if="comp.config.description" class="comp-description">
      <a-divider style="margin: 0;"></a-divider>
      <p class="description" v-for="text in comp.config.description">{{ text }}</p>
    </section>
  </section>
</template>
<script lang="ts" setup>
const props = defineProps({
  comp: {
    type: Object,
    required: true,
  },
});
console.log(props.comp);

</script>
<style lang="scss" scoped>
.description {
  margin: 0;
  font-size: 13px;
  color: #999;
}
.comp-item-container {
}
</style>