<template>
  <a-table :columns="computedColumns" :data="computedData"></a-table>
</template>
<script setup lang="ts">
import { findParentTenonComp } from '@tenon/legacy-materials';
import { computed, getCurrentInstance, h, reactive, toRaw } from 'vue';
import { useStore } from 'vuex';
import { TenonComponent } from '@tenon/legacy-engine';

const props = defineProps<{
  columns: any,
  data: any;
  style: any;
  op: boolean;
}>();

const computedColumns = computed(() => {
  const materialsMap = TenonComponent.materialsMap;
  const factory = materialsMap.get('Compose-View')!;
  const childrenBucket = { value: undefined };
  if (!props.op) return props.columns;
  const store = useStore();
  const operationColumn = {
    dataIndex: '__op__',
    title: '操作',
    width: 200,
    fixed: 'right',
    align: 'center',
    render: ({ record, column, rowIndex }) => {
      const material = factory();
      return h(material.component, {
        isSlot: true,
        slotKey: `op-${rowIndex}`,
        tenonCompProps: reactive({
          record,
          column: toRaw(column),
          rowIndex,
        }),
        placeholder: '拖入组件生成操作',
        childrenBucket,
        disabled: rowIndex !== 0,
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
