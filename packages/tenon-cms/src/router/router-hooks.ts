import { Router } from "vue-router";
import { useStore } from "@/store";
import { Component } from "vue";

export const setupRouterHooks = (router: Router) => {
  const store = useStore();
  router.beforeEach(async (to, from) => {
    const { layoutFactory } = to.meta;
    store.dispatch("layout/setActiveLayout", layoutFactory);
  });
}