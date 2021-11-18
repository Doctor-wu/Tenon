<template>
  <section class="attrs-wrapper">
    <section>
      <a-form :model="activeComponent.props" layout="vertical">
        <a-menu
          :default-open-keys="[schemas?.[0]?.title]"
          :style="{ borderRadius: '4px' }"
          :collapsed="false"
          :level-indent="10"
        >
          <a-sub-menu class="attr-group" v-for="schema in schemas" :key="schema.title">
            <template #title>
              <section class="attr-group-header">
                <b>{{ schema.title }}</b>
              </section>
            </template>
            <a-form-item
              v-for="key in Object.keys(schema.properties)"
              :field="key"
              :label="schema.properties[key].title"
              :key="key"
            >
              <component
                :is="getFormItemBySchemaType(schema.properties[key].type)"
                :options="[]"
                v-model="activeComponent.props[schema.fieldName][key]"
                placeholder="please input..."
              >
                <template
                  v-if="getFormItemBySchemaType(schema.properties[key].type) === 'a-select'"
                >
                  <a-option
                    v-for="optionsKey in Object.keys(schema.properties[key].options)"
                    :value="optionsKey"
                  >{{ schema.properties[key].options[optionsKey] }}</a-option>
                </template>
              </component>
            </a-form-item>
          </a-sub-menu>
        </a-menu>
      </a-form>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '../../store';
import { computed, effect } from 'vue';
import { ComponentTreeNode } from '../../store/modules/viewer';
import { IMaterial } from '../../store/modules/materials';

const store = useStore();
const activeComponent = computed<ComponentTreeNode>(() => store.getters['viewer/getActiveComponent']);
console.log(activeComponent.value);

const schemas = computed(() => {
  const {
    material = {} as IMaterial,
  } = activeComponent.value;

  const {
    schemas = [],
  } = material;
  return schemas;
});

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
.attrs-wrapper {
  width: 100%;
  & :deep(.arco-menu-inline-header) {
    padding: 0 !important;
  }
}
</style>