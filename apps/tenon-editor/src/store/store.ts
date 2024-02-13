import { computed, ref } from "vue";
import { IStoreState, initialState } from "./state";


export class TenonStore {
  static instance: TenonStore;
  static getInstance() {
    if (!TenonStore.instance) {
      TenonStore.instance = new TenonStore();
    }
    return TenonStore.instance;
  }
  private store = ref(initialState);

  getValue = <T extends keyof IStoreState>(key: T) => {
    return computed(() => this.store.value[key]);
  }

  setValue = <T extends unknown>(key: string, value: T) => {
    this.store.value[key] = value;
  }
}

export const getStoreValue = TenonStore.getInstance().getValue;
export const setStoreValue = TenonStore.getInstance().setValue;
