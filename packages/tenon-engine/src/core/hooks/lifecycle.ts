import { TenonBaseHook } from "./base";

export enum LifeCycleHooksKey {
  onSetup = 'onSetup',
  onMounted = 'onMounted',
  onBeforeMount = 'onBeforeMount',
  onBeforeUnmount = 'onBeforeUnmount',
}

export class TenonLifeCycleHook extends TenonBaseHook<LifeCycleHooksKey>{
  public hooks = new Map<LifeCycleHooksKey, Array<Function>>();

  onSetup(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onSetup)) this.hooks.set(LifeCycleHooksKey.onSetup, []);
    this.hooks.get(LifeCycleHooksKey.onSetup)?.push(cb);
  }

  onMounted(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onMounted)) this.hooks.set(LifeCycleHooksKey.onMounted, []);
    this.hooks.get(LifeCycleHooksKey.onMounted)?.push(cb);
  }

  onBeforeMount(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onBeforeMount)) this.hooks.set(LifeCycleHooksKey.onBeforeMount, []);
    this.hooks.get(LifeCycleHooksKey.onBeforeMount)?.push(cb);
  }

  onBeforeUnmount(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onBeforeUnmount)) this.hooks.set(LifeCycleHooksKey.onBeforeUnmount, []);
    this.hooks.get(LifeCycleHooksKey.onBeforeUnmount)?.push(cb);
  }
}