<template>
  <section ref="aboutRef" id="tenon-about-page">123</section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createTenonApp } from "@tenon/sdk";
const aboutRef = ref<HTMLElement>();
  onMounted(() => {
    const app = createTenonApp({
      el: aboutRef.value,
      SDKKey: "6227143df259daae88cc8794",
      // homePageId: '626aadde3201f4b72518e3bd',
      homePageId: import.meta.env.DEV ? "6273735b4d60b49bb67d42cf" : "6273861fe1b3731101f91501",
      mode: import.meta.env.DEV ? 'dev' : 'prod',
    });
    console.log(app);
  });
</script>
<style lang="scss" scoped>
  #tenon-about-page {
    min-width: unset !important;
    width: 100%;
  }
</style>