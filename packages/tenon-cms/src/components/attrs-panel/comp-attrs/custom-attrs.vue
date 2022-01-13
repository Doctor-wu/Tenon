<template>
  <a-button @click="showModal = !showModal" style="margin-bottom: 10px" type="dashed" long>
    <icon-plus></icon-plus> 添加属性
  </a-button>
  <a-card v-if="showModal" title="添加属性" style="margin-bottom: 20px">
    <template #extra>
      <a-button @click="handleCloseModal" type="text">取消</a-button>
    </template>
    <a-form :model="form" layout="vertical" @submit="handleAddAttribute">
      <a-form-item field="name" label="属性Key">
        <a-input v-model="form.attributeKey" placeholder="please enter something" />
      </a-form-item>
      <a-form-item field="post" label="属性类型">
        <a-select v-model="form.attributeType">
          <a-option>string</a-option>
          <a-option>number</a-option>
          <a-option>color</a-option>
          <a-option>boolean</a-option>
          <a-option>select</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="post" label="属性昵称">
        <a-input v-model="form.attributeLabel" placeholder="please enter something" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">添加</a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <AttrsTree :properties="schema.properties" :field-name="schema.fieldName"></AttrsTree>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useStore } from '../../../store';
import AttrsTree from './attrs-tree.vue';

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  }
});

const showModal = ref(false);
const form = reactive({
  attributeKey: "",
  attributeType: "string",
  attributeLabel: ""
});
const handleCloseModal = () => {
  showModal.value = false;
}

const handleAddAttribute = () => {
  props.schema.properties[form.attributeKey] = {
    "type": form.attributeType,
    "title": form.attributeLabel
  };

  handleCloseModal();
}

</script>
<style lang="scss">
</style>