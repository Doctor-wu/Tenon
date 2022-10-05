import { IHeaderBarItem, WorkbenchType } from "../core";

export type UIControllerResult = Promise<Partial<IHeaderBarItem>>;

export const UIControllerKey = Symbol('UIController');

export const UIController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => {
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateUIConfig(name, config);
    }
  }
}