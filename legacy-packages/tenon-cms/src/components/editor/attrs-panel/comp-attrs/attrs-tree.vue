<template>
  <template v-for="key in Object.keys(properties || {})" :key="fieldName + key">
    <template v-if="properties[key].type === 'group'">
      <a-sub-menu class="attrs-group" :title="properties[key].title">
        <AttrsTree :properties="properties[key].properties" :fieldName="fieldName"></AttrsTree>
      </a-sub-menu>
      <a-divider style="margin: 10px 0;"></a-divider>
    </template>
    <template v-else-if="!properties[key].internal">
      <a-form-item :field="key">
        <template #label>
          {{ properties[key].title }}
          <a-button
            class="bindingBtn"
            :class="{ activeBinding: activeComponent.propsBinding.hasBinding(fieldName, key) }"
            type="text"
            size="mini"
            style="padding: 0 3px;"
            @click="() => useExpressionField(fieldName, key)"
          >
            <icon-link />
          </a-button>
        </template>
        <template v-if="!activeComponent.propsBinding.hasBinding(fieldName, key)">
          <component
            :is="getFormItemBySchemaType(properties[key].type, properties[key])"
            v-bind="getBindingsBySchemaType(properties[key].type, key)"
            v-on="getListenersBySchemaType(properties[key].type, key)"
            placeholder="please input..."
            :multiple="!!properties[key].multiple"
            allow-clear
          >
            <template v-if="properties[key].type === 'select'">
              <a-option
                v-for="optionsKey in Object.keys(properties[key].options || {})"
                :value="properties[key].reverse ? properties[key].options[optionsKey] : optionsKey"
              >{{ properties[key].reverse ? optionsKey : properties[key].options[optionsKey] }}</a-option>
            </template>
          </component>
        </template>
        <template v-else>
          <section style="width: 100%">
            <a-alert title="表达式绑定">
              <span>
                可以使用JS表达式来动态的绑定字段,
                <b>$comp</b>将作为组件实例注入到作用域中
              </span>
            </a-alert>
            <a-textarea
              :default-value="activeComponent.propsBinding.getBinding(fieldName, key)"
              v-model="propsBindingComposingValue[`${fieldName}@${key}`]"
              @input="(value) => handleBindingInput(fieldName, key, value)"
              @blur="() => handleBinding(fieldName, key)"
              @focus="handleFocusExpression"
              placeholder="请输入表达式"
              class="binding-textarea"
            ></a-textarea>
          </section>
        </template>
      </a-form-item>
    </template>
  </template>
</template>
<script setup lang="ts">
import { useStore } from '@/store';
import { computed, h, onBeforeUnmount, ref, watchEffect } from 'vue';
import { ISchema, TenonComponent, TenonPropsBinding } from '@tenon/legacy-engine';
import { ColorPicker } from 'vue-color-kit';
import carouselController from './controllers/carousel-controller.vue';
import iconTypeController from './controllers/icon-type-controller.vue';
import tableColumnController from './controllers/table-column-controller.vue';
import tableDataController from './controllers/table-data-controller.vue';
import { editMode } from '@/logic/viewer-status';

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
const activeComponent = computed<TenonComponent>(() => store.getters['viewer/getActiveComponent']);

const propsBindingComposingValue = ref({});

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
      if (!listType) return 'a-input';
      return getListController(listType);
    case 'loop':
      return () => h('b', '该字段仅支持表达式');
    case 'icon-type':
      return iconTypeController;
    case 'table-column':
      return tableColumnController;
    case 'table-data':
      return tableDataController;
    default:
      return 'a-input';
  }
};

function getListController(listType: string) {
  switch (listType) {
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
        modelValue: activeComponent.value.props[props.fieldName]?.[key]
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
    case 'boolean':
    case 'object':
    case 'number':
    case 'select':
    case 'array':
    default:
      return {
        'update:modelValue': (value) => {
          activeComponent.value.props[props.fieldName][key] = value;
        }
      };
  }
}

const useExpressionField = (fieldName, key) => {
  if (activeComponent.value.propsBinding.hasBinding(fieldName, key)) { // 已经存在就解绑
    activeComponent.value.propsBinding.deleteBinding(fieldName, key);
    activeComponent.value.props[fieldName][key] = '';
  } else {
    activeComponent.value.propsBinding.addBinding(fieldName, key, '');
  }
}

const handleFocusExpression = () => {
  TenonPropsBinding.trackingBinding = false;
}

const handleBindingInput = (fieldName, key, value) => {
  propsBindingComposingValue.value[`${fieldName}@${key}`] = value;
}

const handleBinding = async (fieldName, key) => {
  TenonPropsBinding.trackingBinding = true;
  activeComponent.value.propsBinding.addBinding(fieldName, key, propsBindingComposingValue.value[`${fieldName}@${key}`]);
  // const expression = activeComponent.value.propsBinding.getBinding(fieldName, key);
  // if (expression === '' || expression === undefined) return;
  // const pageInfo = await store.getters['page/getPageInfo'];
  // const trigger = new Function('injectMeta', `
  //   const {
  //     $comp,
  //     $pageStates,
  //     _editMode,
  //   } = injectMeta;
  //   try {
  //     return (${expression});
  //   } catch(e) {
  //     console.error(e);
  //     return '';
  //   }
  // `);
  // if (activeComponent.value.runtimeBinding[activeComponent.value.propsBinding.makeKey(fieldName, key)]) {
  //   activeComponent.value.runtimeBinding[activeComponent.value.propsBinding.makeKey(fieldName, key)]();
  // };
  // const cancel = watchEffect(async () => {
  //   if (!TenonPropsBinding.trackingBinding) return;
  //   try {
  //     activeComponent.value.props[fieldName][key] = trigger({
  //       $comp: activeComponent.value,
  //       $pageStates: pageInfo.pageStates,
  //       _editMode: editMode,
  //     });
  //   } catch (e) {
  //     // Message.error(`[Expression Error]: ${e}`);
  //     console.error(e);
  //   }
  // });
  // activeComponent.value.runtimeBinding[activeComponent.value.propsBinding.makeKey(fieldName, key)] = cancel;
}

</script>

<style lang="scss" scoped>
:deep(.arco-textarea-wrapper) .arco-textarea {
  margin-left: 0 !important;
}

:deep(.arco-textarea-wrapper) {
  // margin-left: 20px;
}

.binding-textarea {
  margin-top: 20px;
}

.bindingBtn {
  color: gray;
  &.activeBinding {
    color: #3579f4;
  }
}
</style>
