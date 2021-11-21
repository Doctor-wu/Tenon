<template>
  <section class="attrs-wrapper">
    <section>
      <a-form :model="activeComponent.props" layout="vertical">
        <!-- :default-open-keys="[schemas?.[0]?.title]" -->
        <a-menu :style="{ borderRadius: '4px' }" theme="vertical" :collapsed="false" :level-indent="0">
          <template v-for="(schema, index) in schemas" :key="schema.title">
            <a-sub-menu :title="schema.title">
              <AttrsTrree :properties="schema.properties" :fieldName="schema.fieldName"></AttrsTrree>
            </a-sub-menu>
            <a-divider v-if="index !== schemas.length - 1" style="margin: 10px 0;"></a-divider>
          </template>
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