import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { setupRouterHooks } from './router-hooks';
let router: Router;

export const setupRouter = (app) => {
  // 创建一个新的 store 实例
  router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        name: 'editor',
        component: () => import('../views/EditorCore.vue'),
        meta: {
          layout: () => import('@/layout/EditorLayout.vue'),
        }
      },
      {
        path: '/auth',
        redirect: '/auth/signIn'
      },
      {
        path: '/auth/signIn',
        name: 'signIn',
        component: () => import('../views/Auth/SignIn.vue'),
        meta: {
          layout: () => import('@/layout/AuthLayout.vue'),
        }
      },
      {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('../views/Auth/Signup.vue'),
        meta: {
          layout: () => import('@/layout/AuthLayout.vue'),
        }
      },
      {
        path: '/blank',
        name: 'blank',
        component: () => import('@/views/Blank.vue'),
        meta: {
          layout: () => import('@/layout/Blank.vue'),
        }
      },
      {
        path: '/:catchAll(.*)',
        name: 'shim',
        component: () => import('@/views/Blank.vue'),
        meta: {
          layout: () => import('@/layout/Blank.vue'),
        }
      }
    ],
  });

  // 将 store 实例作为插件安装
  app.use(router);
  setupRouterHooks(router);
};

export const useRouter = () => router;