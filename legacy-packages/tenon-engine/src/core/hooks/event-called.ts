import { TenonBaseHook } from "./base";

export enum TenonEventCalledHooksKey {
  onCalled = 'onCalled',
}

export class TenonEventCalledHook extends TenonBaseHook<TenonEventCalledHooksKey>{
  public hooks = new Map<TenonEventCalledHooksKey, Array<Function>>();

  onCalled(cb: Function) {
    if (!this.hooks.get(TenonEventCalledHooksKey.onCalled)) this.hooks.set(TenonEventCalledHooksKey.onCalled, []);
    this.hooks.get(TenonEventCalledHooksKey.onCalled)?.push(cb);
  }
}