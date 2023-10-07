import { reactive } from "vue";
import { IStoreState, initialState } from "./state";


export class StoreService {
  private store = reactive<IStoreState>(initialState);

  getValue<T extends keyof IStoreState>(key: T) {
    return this.store[key];
  }

  setValue<T extends unknown>(key: string, value: T) {
    this.store[key] = value;
  }
}
