import { Router } from "vue-router";
import { useStore } from "@/store";
import { Component } from "vue";

export const setupRouterHooks = (router: Router) => {
  const store = useStore();
  router.beforeEach(async (to, from) => {
    const { layoutFactory } = to.meta;
    const layoutComp = await (layoutFactory as () => Promise<Component>)();
    store.dispatch("layout/setActiveLayout", layoutComp);
  });
}