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
      app.page.changePage('登陆页');
    }
    return Promise.reject(error);
  }
);

const app = createTenonApp({
  el: '#app',
  mode: (import.meta as any).env.PROD ? 'prod' : 'dev',
  SDKKey: '123',
  // homePageId: (import.meta as any).env.PROD ? '' : '6274cf734d60b49bb67d4687',
  homePageId: (import.meta as any).env.PROD ? '' : '6274cf734d60b49bb67d4687',
  request,
  prefix: (import.meta as any).env.PROD ? '' : 'http://192.168.31.133:9847/',
});
