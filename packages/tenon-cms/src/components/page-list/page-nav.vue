<template>
  <section class="nav-container">
    <a-page-header
      :title="projectInfo?.projectName"
      subtitle="pages"
      @back="$router.push('/project-list')"
    />
  </section>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const projectInfo = ref<any>({});
watchEffect(() => {
  store.getters['project/getProjectInfo'].then((data) => {
    projectInfo.value = data;
  });
})
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