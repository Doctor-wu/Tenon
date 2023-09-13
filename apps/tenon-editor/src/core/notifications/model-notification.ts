import { BaseNotification } from "./base-notification";

export const ModelChange = Symbol('ModelChangeNotification');
export const ThrottleModelChange = Symbol('ThrottleModelChangeNotification');

export class ModelChangeNotification<T extends any> extends BaseNotification<symbol> {
  constructor(public payload: T) {
    super(ModelChange);
  }
}

export class ThrottleModelChangeNotification<T extends any> extends BaseNotification<symbol> {
  constructor(public payload: T) {
    super(ThrottleModelChange);
  }
}
