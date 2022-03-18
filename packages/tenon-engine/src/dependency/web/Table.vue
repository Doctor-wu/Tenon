<template>
  <a-table :columns="computedColumns" :data="computedData"></a-table>
</template>
<script setup lang="ts">
import { findParentTenonComp } from '@tenon/materials';
import { computed, getCurrentInstance, h, useSlots } from 'vue';
import { useStore } from 'vuex';
import { TenonComponent } from '../../core';

const props = defineProps<{
  columns: any,
  data: any;
  style: any;
  op: boolean;
}>();

const computedColumns = computed(() => {
  if(!props.op) return props.columns;
  const slots = useSlots();
  const store = useStore();
  const operationColumn = {
    dataIndex: '__op__',
    title: '操作',
    width: 200,
    fixed: 'right',
    align: 'center',
    render: ({ record, column, rowIndex }) => {
      const materialsMap = store.getters['materials/getMaterialsMap'];
      const factory = materialsMap.get('Compose-View');
      const parent = findParentTenonComp(getCurrentInstance());
      let tenonComponent;
      if (parent?.slots[`op-${rowIndex}`]) {
        tenonComponent = parent?.slots[`op-${rowIndex}`];
      } else {
        tenonComponent = new TenonComponent(
          factory(),
          {
            parent: parent || undefined,
            props: {},
          }
        );
      }
      return h(tenonComponent.material.component, {
        tenonComp: tenonComponent,
        isSlot: true,
        slotKey: `op-${rowIndex}`,
        placeholder: '拖入组件生成操作'
      });
    },
  };
  return props.columns.concat(operationColumn);
});

const computedData = computed(() => {
  return props.data;
});

</script>

<style lang="scss" scoped>
</style>