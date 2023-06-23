import {
  Service,
} from "@tenon/workbench";
import { IStore } from "./interface";
import { reactive } from "vue";

@Service({
  name: IStore,
})
export class TenonEditorStore {
  private store = reactive({});

  getValue<T extends unknown>(key: string) {
    return this.store[key] as T | undefined;
  }

  setValue<T extends unknown>(key: string, value: T) {
    this.store[key] = value;
  }
}
