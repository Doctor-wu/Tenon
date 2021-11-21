<template>
  <template v-for="key in Object.keys(properties)" :key="key">
    <template v-if="properties[key].type === 'group'">
      <a-sub-menu class="attrs-group" :title="properties[key].title" :key="properties[key].title">
        <AttrsTree :properties="properties[key].properties" :fieldName="fieldName"></AttrsTree>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-form-item :field="key" :label="properties[key].title">
        <component
          :is="getFormItemBySchemaType(properties[key].type)"
          :options="[]"
          v-model="activeComponent.props[fieldName][key]"
          placeholder="please input..."
          allow-clear
        >
          <template v-if="getFormItemBySchemaType(properties[key].type) === 'a-select'">
            <a-option
              v-for="optionsKey in Object.keys(properties[key].options)"
              :value="optionsKey"
            >{{ properties[key].options[optionsKey] }}</a-option>
          </template>
        </component>
      </a-form-item>
    </template>
  </template>
</template>
<script setup lang="ts">
import { useStore } from '../../store';
import { computed } from 'vue';
import { ComponentTreeNode } from '../../store/modules/viewer';

defineProps({
  properties: {
    type: Object,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  }
});
const store = useStore();
const activeComponent = computed<ComponentTreeNode>(() => store.getters['viewer/getActiveComponent']);

const getFormItemBySchemaType = (type: string) => {
  switch (type) {
    case 'string':
      return 'a-input';
    case 'number':
      return 'a-input-number';
    case 'boolean':
      return 'a-switch';
    case 'object':
      return 'a-input';
    case 'select':
      return 'a-select';
    default:
      return 'a-input';
  }
};
</script>
<style lang="scss" scoped>
</style>