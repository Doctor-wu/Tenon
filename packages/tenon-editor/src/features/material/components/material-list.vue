<template>
  <section class="material-list-container">
    <div class="material-list">
      <div class="material-list-item" v-for="material in materials" :key="material.id">
        <div class="material-list-item__title">{{ material.name }}</div>
        <div class="material-list-item__content">
          <div class="material-list-item__content__preview">
            <!-- <div class="material-list-item__content__preview__icon">
              <img :src="material.icon" alt="" />
            </div> -->
            <!-- <div class="material-list-item__content__preview__name">
              {{ material.name }}
            </div> -->
          </div>
          <!-- <div class="material-list-item__content__desc">{{ material.desc }}</div> -->
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{
  materials: any[];
}>();
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
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #e8e8e8;
      .material-list-item__title {
        font-size: 14px;
        color: #333;
      }
      .material-list-item__content {
        display: flex;
        align-items: center;
        .material-list-item__content__preview {
          display: flex;
          align-items: center;
          .material-list-item__content__preview__icon {
            width: 40px;
            height: 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .material-list-item__content__preview__name {
            margin-left: 10px;
            font-size: 14px;
            color: #333;
          }
        }
        .material-list-item__content__desc {
          margin-left: 20px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
