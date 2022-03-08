<template>
  <section class="nav-container">
    <a-page-header :title="$route.params?.projectName" subtitle="pages" @back="$router.back()"/>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from '@/router';
const router = useRouter();
</script>
<style lang="scss" scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.divider {
  &::before {
    content: "/";
    padding: 0 6px;
    font-size: 18px;
  }
}
</style>