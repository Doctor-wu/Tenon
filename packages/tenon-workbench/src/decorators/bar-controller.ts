import { IHeaderBarItem, ToolBarConfigType } from "../configs";
import { WorkbenchType } from "../core";

export type UIControllerResult = Promise<Partial<IHeaderBarItem> | Partial<ToolBarConfigType>>;

export const UIControllerKey = Symbol('UIController');

export const HeaderBarController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => {
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateHeaderBarConfig(name, config);
    }
  }
};

export const ToolBarController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => {
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateToolBarConfig(name, config);
    }
  }
}