import { Router } from "vue-router";
import { useStore } from "@/store";

export const setupRouterHooks = (router: Router) => {
  const store = useStore();
  router.beforeEach(async (to, from) => {
    const { layout } = to.meta as any;
    if (!layout) return true;
    const layoutComponent = await layout();
    store.dispatch("layout/setActiveLayout", layoutComponent.default);
  });
}