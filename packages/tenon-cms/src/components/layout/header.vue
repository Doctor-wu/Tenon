<template>
  <section class="wrapper">
    <h2>
      Tenon
      <span class="sub-title">低代码平台</span>
    </h2>
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/">定制物料</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/">文档</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/">组件</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/">关于</router-link>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  justify-content: space-between;
}

.sub-title {
  font-size: 13px;
  color: #999;
  font-weight: 500;
}

.nav-list {
  display: flex;
}

.nav-item {
  margin-right: 20px;
}
</style>

