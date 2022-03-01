<template>
  <a-carousel
    :style="{
      width: '100%',
      height: '100%'
    }"
    :auto-play="true"
    indicator-type="line"
    indicator-position="bottom"
    show-arrow="never"
    :default-current="2"
  >
    <a-carousel-item v-for="image in images">
      <img :src="image" :style="{
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      }" />
    </a-carousel-item>
  </a-carousel>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';


const images = reactive(
  [
    'https://pic1.zhimg.com/80/v2-0e687e2cf004312945f4eb9f050203bd_1440w.jpg?source=1940ef5c',
    'https://pica.zhimg.com/80/v2-ab4ddd2dd496da5f7c28c3e53ae4685a_1440w.jpg?source=1940ef5c',
    'https://pic2.zhimg.com/80/v2-faf6fbe0b3e27342771f860bda1946b7_1440w.jpg?source=1940ef5c',
  ]
)
</script>