import { Message } from '@arco-design/web-vue';
import { createTenonApp } from '@tenon/sdk';
import '@tenon/sdk/src/web/dist/style.css';
import axios from 'axios';

const request = axios.create({
  baseURL: (import.meta as any).env.PROD ? 'prod' : 'http://localhost:4897/',
  withCredentials: true,
});

request.interceptors.request.use(
  config => {
    // TODO
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error);
  });


  request.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    const code = error.response?.status
    if (code === 403) {
      // TODO 登陆态失效
      app.store.remove('user');
      app.page.changePage('627a22f2549f6c71194c78ec');
      Message.warning('登录过期, 请重新登录');
    }
    return Promise.reject(error);
  }
);

const app = createTenonApp({
  el: '#app',
  mode: (import.meta as any).env.PROD ? 'prod' : 'dev',
  SDKKey: '627a7ed3549f6c71194c7b33',
  homePageId: (import.meta as any).env.PROD ? '' : '627a7ed3549f6c71194c7b33',
  request,
  prefix: (import.meta as any).env.PROD ? '' : 'http://192.168.3.210:9847/',
});
