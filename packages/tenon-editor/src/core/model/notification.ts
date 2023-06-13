import { BaseNotification } from "../notification";
import type { RuntimeComponentTree } from "../../features/runtime-component-tree/runtime-component-tree";

export const ModelChange = Symbol('ModelChangeNotification');

export class ModelChangeNotification extends BaseNotification<symbol> {
  constructor(public payload: RuntimeComponentTree) {
    super(ModelChange);
  }
}
