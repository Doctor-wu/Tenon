import { createRouter, createWebHashHistory, Router } from 'vue-router'
let router: Router;

export const setupRouter = (app) => {
  // 创建一个新的 store 实例
  router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/View.vue'),
        meta: {
          layout: () => import('@/layout/Editor.vue'),
        }
      }
    ],
  });

  // 将 store 实例作为插件安装
  app.use(router);
};

export const useRouter = () => router;