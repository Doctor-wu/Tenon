import { TenonBaseHook } from "./base";

export enum PropsBindingStaticHooksKey {
  afterAddingBinding = 'afterAddingBinding',
}

export class TenonPropsBindingStaticHook extends TenonBaseHook<PropsBindingStaticHooksKey>{
  public hooks = new Map<PropsBindingStaticHooksKey, Array<Function>>();

  afterAddingBinding(cb: Function) {
    if (!this.hooks.get(PropsBindingStaticHooksKey.afterAddingBinding)) this.hooks.set(PropsBindingStaticHooksKey.afterAddingBinding, []);
    this.hooks.get(PropsBindingStaticHooksKey.afterAddingBinding)?.push(cb);
  }
}
