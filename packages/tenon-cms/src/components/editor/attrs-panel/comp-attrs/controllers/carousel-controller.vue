<template>
  <section class="container">
    <a-list style="margin-bottom: 12px">
      <a-list-item v-for="(item, index) in list" style="display: flex;">
        <section class="list-item">
          <section class="item-info">{{ item }}</section>
          <section class="icon-wrapper">
            <a-button @click="() => handleCopy(index)" type="text" status="primary">
              <icon-copy size="48" />
            </a-button>
            <a-button @click="() => handleDelete(index)" type="text" status="danger">
              <icon-minus-circle size="48" />
            </a-button>
          </section>
        </section>
      </a-list-item>
    </a-list>
    <a-input v-model="beAddedInfo"></a-input>
    <a-button @click="handleAdd" :disabled="!beAddedInfo" type="primary" long>
      <icon-plus-circle />增加
    </a-button>
  </section>
</template>
<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';

const props = defineProps<{
  list: string[];
}>();

const beAddedInfo = ref("");

function handleDelete(index: number) {
  props.list.splice(index, 1);
}

function handleCopy(index: number) {
  navigator.clipboard.writeText(props.list[index]);
  Message.success('复制成功');
}

function handleAdd() {
  props.list.push(beAddedInfo.value);
  beAddedInfo.value = "";
}
</script>
<style lang="scss" scoped>
.list-item {
  display: flex;
  justify-content: space-between;

  .item-info {
    flex: 1;
    word-break: break-all;
  }

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
  }
}
</style>