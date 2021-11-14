<template>
  <section class="notice-wrapper">
    <section v-for="item in noticeList" style="display: flex;align-items: center;margin-right: 10px;">
      <b>{{ item.title }}:</b>
      <section style="margin: 0 5px;width: 50px;height: 0;" :style="item.style"></section>
    </section>
  </section>
</template>
<script setup lang="ts">
const noticeList = [
  {
    title: '元素可选择状态',
    style: {
      borderTop: '2px solid #1693ef'
    },
  },
  {
    title: '元素选中状态',
    style: {
      borderTop: '2px dotted #9316ef'
    },
  },
  {
    title: '元素被放置容器状态',
    style: {
      borderTop: '2px dashed red'
    },
  },
  {
    title: '元素被放置位置',
    style: {
      borderTop: '2px solid #00b42a'
    },
  },
]
</script>
<style lang="scss" scoped>
.notice-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
</style>