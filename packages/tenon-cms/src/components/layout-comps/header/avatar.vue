<template>
  <a-dropdown trigger="hover" position="br">
    <a-avatar
      style="background-color: #3378f3;"
      shape="square"
    >{{ userInfo?.username?.slice(0, 1).toUpperCase() }}</a-avatar>
    <template #content>
      <a-doption class="list-item">
        <template #icon>
          <icon-user />
        </template>
        <template #default> 个人信息</template>
      </a-doption>
      <a-doption class="list-item" @click="logout">
        <template #icon>
          <icon-undo />
        </template>
        <template #default> 退出登录</template>
      </a-doption>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { signOutApi } from '@/api';
import { getUserModel } from '@/local-db/controller/user';
import { useRouter } from '@/router';
import { Message } from '@arco-design/web-vue';
const store = useStore();

const userInfo = ref<any>({});
store.getters['user/getUserInfo'].then((data) => {
  userInfo.value = data;
});

async function logout() {
  const { success } = await signOutApi();
  if (success) {
    await getUserModel().remove();
    store.dispatch('user/clearUserInfo');
  }
  useRouter().push('/auth/signIn');
  Message.success('登出成功');
}
</script>
<style lang="scss" scoped>
.list-item {
  padding: 0 10px;
  box-sizing: content-box;
  &:hover {
    color: #337ef3;
  }
}
</style>