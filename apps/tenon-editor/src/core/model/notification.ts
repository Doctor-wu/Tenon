import type { TenonEditorContext } from "../context";
import { BaseNotification } from "../notification";

export const ModelChange = Symbol('ModelChangeNotification');
export const ThrottleModelChange = Symbol('ThrottleModelChangeNotification');

export class ModelChangeNotification<T extends any> extends BaseNotification<symbol> {
  constructor(public payload: T) {
    super(ModelChange);
  }
}

export class ThrottleModelChangeNotification<T extends any> extends ModelChangeNotification<T> {
  static readonly defaultThrottleTime = 100;
  static lastFire = 0;

  constructor(payload: T, private context: TenonEditorContext) {
    super(payload);
  }

  get throttleTime() {
    return ThrottleModelChangeNotification.defaultThrottleTime;
  }

  get lastFire() {
    return ThrottleModelChangeNotification.lastFire;
  }

  set lastFire(value) {
    ThrottleModelChangeNotification.lastFire = value;
  }

  canFire() {
    const now = Date.now();
    if (now - this.lastFire > this.throttleTime) {
      this.lastFire = now;
      return true;
    }
    return false;
  }

  getNextFireTime() {
    return this.throttleTime - (Date.now() - this.lastFire);
  }
}
