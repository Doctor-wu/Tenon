<template>
  <section class="wrapper">
    <h2>
      Tenon
      <span class="sub-title">一站式低代码平台</span>
    </h2>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="https://github.com/Doctor-wu/Tenon" target="_blank" class="icon-router">
          <icon-github />
        </a>
      </li>
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
  height: 50px;
}

.nav-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
  & a {
    color: #333;
    transition: all ease 0.3s;
    &:hover {
      color: #1693ef;
    }
  }
}

.icon-router {
  font-size: 24px;
}
</style>

