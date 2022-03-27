import { reactive } from "vue";

export interface ITenonComponentStates {
  states: any;
}
export class TenonComponentStates implements ITenonComponentStates {
  private _states: any;
  private _tenonComp: any;

  constructor(states: any = {}, tenonComp: any) {
    this._states = reactive(states);
    this.proxyState(this._states);
    this._tenonComp = tenonComp;
  }

  private proxyState(states: any) {
    Object.keys(states).forEach(key => {
      Reflect.defineProperty(this, key, {
        get(this: any) {
          return Reflect.get(this._states, key);
        },
        set(this: any, value) {
          return Reflect.set(this._states, key, value);
        }
      })
    })
  }

  get states() {
    return this._states;
  }
}