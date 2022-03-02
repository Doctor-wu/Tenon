import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue';
import './style/index.scss';
import '@arco-design/web-vue/dist/arco.css';
import { ColorPicker } from 'vue-color-kit'
// stylesheet
import 'vue-color-kit/dist/vue-color-kit.css'

import { setupStore } from './store';
import { setupRouter } from './router';
import { TenonIndexedDBInstance } from './local-db/indexedDB';

const app = createApp(App);

// 初始化 arco-design
app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  componentPrefix: 'a'
});
app.use(ArcoVueIcon);

const bootstrap = async () => {
  // 初始化Store
  setupStore(app);
  // 初始化路由
  setupRouter(app);
  // 将app挂载到页面上
  app.mount('#app');
}

TenonIndexedDBInstance.eventEmitter.on('onLaunch', bootstrap);
