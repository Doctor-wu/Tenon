
export enum StaticHooksKey {
  afterDeserialize = 'afterDeserialize',
}

export class TenonStaticHook {
  public hooks = new Map<StaticHooksKey, Array<Function>>();

  afterDeserialize(cb: Function) {
    if (!this.hooks.get(StaticHooksKey.afterDeserialize)) this.hooks.set(StaticHooksKey.afterDeserialize, []);
    this.hooks.get(StaticHooksKey.afterDeserialize)?.push(cb);
  }

  executeHook(hook: StaticHooksKey, ...args: any[]) {
    if (!this.hooks.get(hook)) return;
    this.hooks.get(hook)?.forEach(cb => cb(...args));
  }
}