<template>
  <section class="attrs-wrapper">
    <section>
      <a-form :model="activeComponent.props" layout="vertical">
        <a-menu :key="activeComponent.id" :style="{ borderRadius: '4px' }" theme="vertical" :collapsed="false"
          :level-indent="0">
          <template v-for="(schema, index) in schemas">
            <a-sub-menu :title="schema.title">
              <CustomAttrs v-if="schema.type === 'custom'" :schema="schema"></CustomAttrs>
              <AttrsTree v-else :properties="schema.properties" :fieldName="schema.fieldName"></AttrsTree>
            </a-sub-menu>
            <a-divider v-if="index !== schemas.length - 1" style="margin: 10px 0;"></a-divider>
          </template>
        </a-menu>
      </a-form>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { useStore } from '@/store';
import { computed } from 'vue';
import { ComponentTreeNode } from '@tenon/legacy-engine';
import AttrsTree from './attrs-tree.vue';
import CustomAttrs from './custom-attrs.vue';
import { IMaterialConfig } from '@tenon/legacy-materials';
const activeComponent = computed<ComponentTreeNode>(() => store.getters['viewer/getActiveComponent']);

const store = useStore();

const schemas = computed(() => {
  const {
    schemas, material = {} as IMaterialConfig,
  } = activeComponent.value;

  return schemas;
});

</script>
<style lang="scss" scoped>
.attrs-wrapper {
  width: 100%;
}

.attrs-group {
  padding-left: 10px;
}

:deep(.arco-menu-inline-content) {
  padding-left: 12px;
  margin-top: 12px;
}
</style>
