import { defineComponent, h } from 'vue';
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { setupRouterHooks } from './router-hooks';
import DynamicLoadingComponent from '@/components/shared/dynamic-loading-component.vue';
let router: Router;

function createDynamicLoadingComponent(factory: () => Promise<any>) {
  return defineComponent({
    render: () => {
      return h(DynamicLoadingComponent, {
        componentFactory: factory,
      })
    },
  });
}

export const setupRouter = (app) => {
  // 创建一个新的 store 实例
  router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/edit/:projectId/:pageId',
        name: 'editor',
        component: createDynamicLoadingComponent(
          () => import('@/views/EditorCore.vue')
        ),
        meta: {
          layout: () => import('@/layout/EditorLayout.vue'),
          needAuth: true,
        }
      },
      {
        path: '/',
        redirect: '/project-list',
      },
      {
        path: '/project-list',
        name: 'project-list',
        component: createDynamicLoadingComponent(
          () => import('@/views/TenonProjectCore.vue'),
        ),
        meta: {
          layout: () => import('@/layout/TenonProjectLayout.vue'),
          needAuth: true,
        }
      },
      {
        path: '/page-list/:projectId/:projectName',
        name: 'page-list',
        component: createDynamicLoadingComponent(
          () => import('@/views/TenonPageCore.vue')
        ),
        meta: {
          layout: () => import('@/layout/TenonPageLayout.vue'),
          needAuth: true,
        }
      },
      {
        path: '/auth',
        redirect: '/auth/signIn',
      },
      {
        path: '/auth/signIn',
        name: 'signIn',
        component: createDynamicLoadingComponent(
          () => import('@/views/Auth/SignIn.vue')
        ),
        meta: {
          layout: () => import('@/layout/AuthLayout.vue'),
          authPage: true,
        }
      },
      {
        path: '/auth/signup',
        name: 'signup',
        component: createDynamicLoadingComponent(
          () => import('@/views/Auth/Signup.vue')
        ),
        meta: {
          layout: () => import('@/layout/AuthLayout.vue'),
          authPage: true,
        }
      },
      {
        path: '/blank',
        name: 'blank',
        component: createDynamicLoadingComponent(
          () => import('@/views/Blank.vue')
        ),
        meta: {
          layout: () => import('@/layout/Blank.vue'),
        }
      },
      {
        path: '/:catchAll(.*)',
        name: 'shim',
        component: createDynamicLoadingComponent(
          () => import('@/views/Blank.vue')
        ),
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