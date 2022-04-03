
export enum LifeCycleHooksKey {
  onMounted = 'onMounted',
  onBeforeUnmount = 'onBeforeUnmount',
}

export class TenonLifeCycleHook {
  public hooks = new Map<LifeCycleHooksKey, Array<Function>>();

  onMounted(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onMounted)) this.hooks.set(LifeCycleHooksKey.onMounted, []);
    this.hooks.get(LifeCycleHooksKey.onMounted)?.push(cb);
  }

  onBeforeUnmount(cb: Function) {
    if (!this.hooks.get(LifeCycleHooksKey.onBeforeUnmount)) this.hooks.set(LifeCycleHooksKey.onBeforeUnmount, []);
    this.hooks.get(LifeCycleHooksKey.onBeforeUnmount)?.push(cb);
  }

  executeHook(hook: LifeCycleHooksKey, ...args: any[]) {
    if (!this.hooks.get(hook)) return;
    this.hooks.get(hook)?.forEach(cb => cb(...args));
  }
}