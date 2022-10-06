import { Singleton } from "@tenon/shared";
import { reactive } from "vue";
import { Service } from "../decorators";
import { createServiceTag } from "./tag";


export const ContextService = createServiceTag('ContextService');

@Service({
  name: ContextService,
})
@Singleton
export class ContextServiceCore {
  context = reactive<any>({});

  get (key: any) {
    return this.context[key];
  }

  set(key: any, value: any) {
    this.context[key] = value;
  }
}