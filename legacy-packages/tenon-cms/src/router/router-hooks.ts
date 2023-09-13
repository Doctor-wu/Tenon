import { Router } from "vue-router";
import { useStore } from "@/store";
import { Message } from "@arco-design/web-vue";

export const setupRouterHooks = (router: Router) => {
  const store = useStore();
  router.beforeEach(async (to, from, next) => {
    console.log(to, from);

    const { layout, needAuth, authPage } = to.meta as any;
    const userInfo = await store.getters['user/getUserInfo'];
    if (needAuth && !userInfo) {
      Message.info('请登录');
      return next('/auth/signIn');
    } else if (userInfo && authPage) {
      Message.success(`${userInfo.username}, 您已登录`);
      return next('/');
    }
    if (!layout) return true;
    const timer = setTimeout(() => { // 延迟50ms设置loading，避免闪屏 
      store.dispatch('layout/setLoading', true);
    }, 50);
    const layoutComponent = await layout();
    clearTimeout(timer);
    store.dispatch("layout/setActiveLayout", layoutComponent.default);
    store.dispatch('layout/setLoading', false);
    next();
  });
}