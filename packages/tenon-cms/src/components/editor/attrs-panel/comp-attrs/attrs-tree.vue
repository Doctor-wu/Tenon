<template>
  <template v-for="key in Object.keys(properties)" :key="fieldName + key">
    <template v-if="properties[key].type === 'group'">
      <a-sub-menu class="attrs-group" :title="properties[key].title">
        <AttrsTree :properties="properties[key].properties" :fieldName="fieldName"></AttrsTree>
      </a-sub-menu>
      <a-divider style="margin: 10px 0;"></a-divider>
    </template>
    <template v-else>
      <a-form-item :field="key" :label="properties[key].title">
        <component
          :is="getFormItemBySchemaType(properties[key].type, properties[key])"
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
import { useStore } from '@/store';
import { computed } from 'vue';
import { ComponentTreeNode, ISchema } from '@tenon/engine';
import { ColorPicker } from 'vue-color-kit';
import carouselController from './controllers/carousel-controller.vue';
import iconTypeController from './controllers/icon-type-controller.vue';

const props: {
  properties: Record<string, ISchema>;
  fieldName: string;
} = defineProps({
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

const getFormItemBySchemaType = (type: string, meta: ISchema) => {
  switch (type) {
    case 'string':
      return 'a-textarea';
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
    case 'array':
      const listType = meta.listType;
      if(!listType) return 'a-input';
      return getListController(listType);
    case 'icon-type':
      return iconTypeController;
    default:
      return 'a-input';
  }
};

function getListController(listType: string) {
  switch(listType) {
    case 'carousel':
      return carouselController;
    default:
      return 'a-input';
  }
}

const getBindingsBySchemaType = (type: string, key) => {
  switch (type) {
    case 'color':
      return {
        color: activeComponent.value?.props?.[props.fieldName]?.[key]
      }
    case 'array':
      return {
        list: activeComponent.value.props?.[props.fieldName]?.[key]
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
:deep(.arco-textarea-wrapper) .arco-textarea{
    margin-left: 0 !important;
}

:deep(.arco-textarea-wrapper) {
  // margin-left: 20px;
}
</style>