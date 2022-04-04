import { TenonBaseHook } from "./base";

export enum LifeCycleHooksKey {
  onMounted = 'onMounted',
  onBeforeUnmount = 'onBeforeUnmount',
}

export class TenonLifeCycleHook extends TenonBaseHook<LifeCycleHooksKey>{
  public hooks = new Map<LifeCycleHooksKey, Array<Function>>();

  onMounted(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onMounted)) this.hooks.set(LifeCycleHooksKey.onMounted, []);
    this.hooks.get(LifeCycleHooksKey.onMounted)?.push(cb);
  }

  onBeforeUnmount(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onBeforeUnmount)) this.hooks.set(LifeCycleHooksKey.onBeforeUnmount, []);
    this.hooks.get(LifeCycleHooksKey.onBeforeUnmount)?.push(cb);
  }
}