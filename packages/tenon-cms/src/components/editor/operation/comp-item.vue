<template>
  <a-menu-item
    class="comp-item"
    :draggable="editMode"
    @dragstart="(e) => handleMaterialDragStart(e, config)"
    @dragend="(e) => handleMaterialDragEnd(e, config)"
  >
    <section class="comp-item-container">
      <section class="comp-item-header">
        <section class="comp-info">
          <component v-if="component.config.icon" :is="'icon-' + component.config.icon" />
          {{ component.name }}
        </section>
        <section class="comp-platform">
          <a-tag
            color="arcoblue"
            style="margin-right: 5px;"
            v-for="item in component.config.platform || []"
          >{{ item }}</a-tag>
        </section>
      </section>
      <section v-if="component.config.description" class="comp-description">
        <a-divider style="margin: 0 0 10px 0;"></a-divider>
        <p class="description" v-for="text in component.config.description">{{ text }}</p>
      </section>
    </section>
  </a-menu-item>
</template>
<script lang="ts" setup>
import { handleMaterialDragStart, handleMaterialDragEnd } from '../../../logic/viewer-drag';
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
import { editMode } from '../../../logic/viewer-status';

const props = defineProps({
  config: {
    type: Function,
    required: true,
  },
});

const component = props.config();

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
  user-select: none;
}

.comp-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>