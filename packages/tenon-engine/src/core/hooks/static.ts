import { TenonBaseHook } from "./base";

export enum StaticHooksKey {
  afterDeserialize = 'afterDeserialize',
}

export class TenonStaticHook extends TenonBaseHook<StaticHooksKey>{
  public hooks = new Map<StaticHooksKey, Array<Function>>();

  afterDeserialize(cb: Function) {
    if (!this.hooks.get(StaticHooksKey.afterDeserialize)) this.hooks.set(StaticHooksKey.afterDeserialize, []);
    this.hooks.get(StaticHooksKey.afterDeserialize)?.push(cb);
  }
}
