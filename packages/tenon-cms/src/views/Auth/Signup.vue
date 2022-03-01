<template>
  <AuthPageTitle title="注册"></AuthPageTitle>
  <Animate
    ref="animator"
    animate-name="slide-in-from-right"
    :duration="1000"
    timing-function="ease-out"
  >
    <a-form
      ref="formRef"
      :model="form"
      :style="{ padding: '0 40px 0 0', width: '520px' }"
      @submit="handleSubmit"
    >
      <a-form-item :rules="rules.username" field="username" label="用户名">
        <a-input v-model="form.username" placeholder="please enter your username..." />
      </a-form-item>
      <a-form-item :rules="rules.password" field="password" label="密码">
        <a-input
          v-model="form.password"
          type="password"
          placeholder="please enter your password..."
        />
      </a-form-item>
      <a-form-item :rules="rules.phone" field="phone" label="手机号">
        <a-input v-model="form.phone" placeholder="please enter your phone..." />
      </a-form-item>
      <a-form-item :rules="rules.email" field="email" label="邮箱">
        <a-input v-model="form.email" type="email" placeholder="please enter your email..." />
      </a-form-item>
      <a-form-item style="align-items: center" :rules="rules.captcha" field="captcha" label="验证码">
        <a-input v-model="form.captcha" placeholder="please enter your captcha..." />
        <span class="captcha" @click="updateCaptcha" v-if="captcha" v-html="captcha"></span>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" status="success" html-type="submit" long>注册</a-button>
        <a-button
          @click="() => $router.push('signIn')"
          type="text"
          style="margin-left: 5px;"
        >已经有账号？去登录</a-button>
      </a-form-item>
    </a-form>
  </Animate>
</template>
<script setup lang="ts">
import { signupApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { debounce } from 'lodash';
import { onMounted, reactive, ref } from 'vue';
import { useCaptcha } from './captcha';
import Animate from '@/components/shared/animate.vue';
import AuthPageTitle from '@/components/layout-comps/auth/auth-page-title.vue';
const formRef = ref<any>(null);
const form = reactive({
  username: '',
  password: '',
  captcha: '',
  phone: '',
  email: '',
});
const [captcha, updateCaptcha] = useCaptcha();
const animator = ref();
onMounted(() => {
  animator.value.run();
});

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名' },
    { minLength: 4, message: '用户名最少需要4位字符' },
    { maxLength: 12, message: '用户名最多包含12位字符' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { minLength: 6, message: '密码最少需要6位字符' },
    { maxLength: 20, message: '密码最多包含20位字符' },
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { minLength: 8, message: '手机号最少需要8位字符' },
    { maxLength: 11, message: '手机号最多包含11位字符' },
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入正确的邮箱' },
  ],
  captcha: [
    { required: true, message: '请输入验证码' },
    { length: 4, message: '验证码需要4位' },
  ]
});

updateCaptcha();

const handleSubmit = debounce(async () => {
  const errors = await formRef.value.validate();
  if (errors) {
    return Object.keys(errors).forEach((errorKey) => {
      Message.error(errors[errorKey].message);
    });
  }
  const result = await signupApi(form);
  if (result.success) {
    Message.success('注册成功');
  } else {
    Message.error(result.errorMsg!);
    updateCaptcha();
  }
  console.log(result);
}, 1000, {
  leading: true,
});

</script>
<style lang="scss" scoped>
:deep(.arco-row) {
  align-items: center;
}

.captcha {
  cursor: pointer;
}
</style>