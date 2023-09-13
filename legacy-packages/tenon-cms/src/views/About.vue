<template>
  <section ref="aboutRef" id="tenon-about-page">123</section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createTenonApp } from "@tenon/legacy-sdk";
const aboutRef = ref<HTMLElement>();
  onMounted(() => {
    const app = createTenonApp({
      el: aboutRef.value,
      SDKKey: "6227143df259daae88cc8794",
      // homePageId: '626aadde3201f4b72518e3bd',
      homePageId: import.meta.env.DEV ? "627a1401bfad6597029058cc" : "6273861fe1b3731101f91501",
      mode: import.meta.env.DEV ? 'dev' : 'prod',
      prefix: 'http://localhost:9847/'
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
