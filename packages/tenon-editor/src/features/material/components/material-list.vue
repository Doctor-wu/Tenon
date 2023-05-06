<template>
  <section class="material-list-container">
    <div class="material-list">
      <Card
        v-for="material in materials"
        :bordered="true"
        class="material-list-item"
        size="small"
      >
        <section class="material-list-item__title">
          <Icon :name="material.icon" style="margin-right: 4px"></Icon>
          <span> {{ material.name }}</span>
        </section>
        <section class="material-list-item__desc">
          {{ material.description }}
        </section>
        <component :is="material.render({})"></component>
      </Card>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Card, Icon } from "tdesign-vue-next";
import { BaseMaterial } from "@tenon/materials";

const props = defineProps<{
  materials: BaseMaterial[];
}>();
console.log(props.materials);
props.materials[0].bridge.register("tenon-event:onClick", () => {
  console.log("click");
});
props.materials[0].bridge.register("tenon-event:onDoubleClick", () => {
  console.log("double click");
});
</script>
<style lang="scss" scoped>
.material-list-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .material-list {
    width: 100%;
    height: 100%;
    overflow: auto;
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
    }
  }
}
</style>
