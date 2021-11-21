<template>
  <section class="attrs-wrapper">
    <section>
      <a-form :model="activeComponent.props" layout="horizontal">
        <!-- :default-open-keys="[schemas?.[0]?.title]" -->
        <a-menu :style="{ borderRadius: '4px' }" :collapsed="false">
          <a-sub-menu
            class="attrs-group"
            v-for="schema in schemas"
            :title="schema.title"
            :key="schema.title"
          >
            <AttrsTrree :properties="schema.properties" :fieldName="schema.fieldName"></AttrsTrree>
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
import { IMaterialConfig } from '../../store/modules/materials';
import AttrsTrree from './attrs-tree.vue';

const store = useStore();
const activeComponent = computed<ComponentTreeNode>(() => store.getters['viewer/getActiveComponent']);

const schemas = computed(() => {
  const {
    material = {} as IMaterialConfig,
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
}

.attrs-group {
  padding-left: 10px;
}
</style>