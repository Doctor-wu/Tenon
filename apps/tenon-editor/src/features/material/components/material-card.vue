<template>
  <Card class="material-list-item" size="small" :bordered="true">
    <section class="material-list-item__title">
      <Icon
        v-if="typeof renderer.icon === 'string'"
        :name="(renderer?.icon as string)"
        style="margin-right: 4px"
      ></Icon>
      <component v-else :is="renderer.icon" style="margin-right: 4px"></component>
      <span> {{ renderer?.formatName }}</span>
      <section class="material-list-item__support-renderer">
        <Space size="4px">
          <section
            v-for="host in renderer.supportRenderHost"
            :class="rendererTagProps[host].class"
          ></section>
        </Space>
      </section>
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
import { Card, Icon, Tag, Space } from "tdesign-vue-next";
import { RuntimeTreeNode, IRenderer, ModelHost, RendererHost } from "@tenon/engine";
defineProps<{
  model: RuntimeTreeNode;
  renderer: IRenderer<ModelHost, RendererHost>;
}>();

const rendererTagProps = {
  vue: {
    class: "i-logos:vue",
  },
  react: {
    class: "i-logos:react",
  },
  default: {
    class: "i-logos:tenon",
  },
};
</script>
<style lang="scss" scoped>
.material-list-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 12px;
  cursor: grab;
  border-bottom: 1px solid #e8e8e8;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);
  }
  &:active {
    cursor: grabbing;
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

    .material-list-item__support-renderer {
      overflow: hidden;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
    }
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
