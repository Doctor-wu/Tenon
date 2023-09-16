<template>
  <Card class="material-list-item" size="small" :bordered="true">
    <section class="material-list-item__title">
      <Icon :name="(renderer?.icon as string)" style="margin-right: 4px"></Icon>
      <span> {{ renderer?.name }}</span>
    </section>
    <section class="material-list-item__desc">
      {{ renderer!.description }}
    </section>
    <section class="material-list-item__preview">
      <component :is="renderer.render(RendererHost.Vue, model, {})"></component>
    </section>
  </Card>
</template>
<script setup lang="ts">
import { Card, Icon } from "tdesign-vue-next";
import { RuntimeTreeNode, IRenderer, ModelHost, RendererHost } from "@tenon/engine";
defineProps<{
  model: RuntimeTreeNode;
  renderer: IRenderer<ModelHost, RendererHost>;
}>();
</script>
<style lang="scss" scoped>
.material-list-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 12px;
  cursor: pointer;
  border-bottom: 1px solid #e8e8e8;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);
  }
  ::v-deep(.t-card__body) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: flex-start;
  }
  .material-list-item__title {
    height: 25px;
    display: flex;
    width: 100%;
    margin-bottom: 8px;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    color: #333;
  }
  .material-list-item__desc {
    flex: 1;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    color: #999;
    margin-bottom: 8px;
  }
  .material-list-item__preview {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
