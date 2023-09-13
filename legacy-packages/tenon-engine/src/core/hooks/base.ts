
export class TenonBaseHook<HookKey> {
  public hooks = new Map<HookKey, Array<Function>>();

  executeHook(hook: HookKey, ...args: any[]) {
    if (!this.hooks.get(hook)) return;
    this.hooks.get(hook)?.forEach(cb => cb(...args));
  }
}