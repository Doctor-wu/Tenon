<template>
  <template v-for="key in Object.keys(properties)" :key="fieldName + key">
    <template v-if="properties[key].type === 'group'">
      <a-sub-menu class="attrs-group" :title="properties[key].title">
        <AttrsTree :properties="properties[key].properties" :fieldName="fieldName"></AttrsTree>
      </a-sub-menu>
      <a-divider style="margin: 10px 0;"></a-divider>
    </template>
    <template v-else>
      <a-form-item :field="key" :label="properties[key].title" style="margin-left: 30px;">
        <component
          :is="getFormItemBySchemaType(properties[key].type, key)"
          v-bind="getBindingsBySchemaType(properties[key].type, key)"
          v-on="getListenersBySchemaType(properties[key].type, key)"
          v-model="activeComponent.props[props.fieldName][key]"
          placeholder="please input..."
          allow-clear
        >
          <template v-if="properties[key].type === 'select'">
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
import { ColorPicker } from 'vue-color-kit';

const props = defineProps({
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

const getFormItemBySchemaType = (type: string, key) => {
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
    case 'color':
      return ColorPicker;
    default:
      return 'a-input';
  }
};

const getBindingsBySchemaType = (type: string, key) => {
  switch (type) {
    case 'color':
      return {
        color: activeComponent.value?.props?.[props.fieldName]?.[key]
      }
    case 'string':
    case 'boolean':
    case 'object':
    case 'number':
    case 'select':
    default:
      return {
      }
  }
}

const getListenersBySchemaType = (type: string, key) => {
  switch (type) {
    case 'color':
      return {
        changeColor: (value) => {
          activeComponent.value.props[props.fieldName][key] = value.hex;
        },
      }
    case 'string':
    case 'number':
    case 'boolean':
    case 'object':
    default:
      return {};
  }
}
</script>
<style lang="scss" scoped>
</style>