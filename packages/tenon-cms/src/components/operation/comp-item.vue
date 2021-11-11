<template>
  <a-menu-item class="comp-item">
    <section class="comp-item-container">
      <section>
        <component v-if="comp.config.icon" :is="'icon-' + comp.config.icon" />
        {{ comp.name }}
      </section>
      <section v-if="comp.config.description" class="comp-description">
        <a-divider style="margin: 0 0 10px 0;"></a-divider>
        <p class="description" v-for="text in comp.config.description">{{ text }}</p>
      </section>
    </section>
  </a-menu-item>
</template>
<script lang="ts" setup>
const props = defineProps({
  comp: {
    type: Object,
    required: true,
  },
});

</script>
<style lang="scss" scoped>
.description {
  margin: 0;
  font-size: 13px;
  color: #999;
  white-space: pre-wrap;
  line-height: 1.5;
}
.comp-item-container {
  padding-bottom: 10px;
}
.comp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #ccccccaa;
}
</style>