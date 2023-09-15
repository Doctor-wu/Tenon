import { BaseMutation } from "@tenon/engine";
import { BaseNotification } from "./base-notification";

export const InvokeMutations = Symbol('InvokeMutationNotification');

export class InvokeMutationNotification extends BaseNotification<symbol> {
  mutations: BaseMutation[];
  constructor(public payload: BaseMutation[]) {
    super(InvokeMutations);
    this.mutations = payload;
  }
}
