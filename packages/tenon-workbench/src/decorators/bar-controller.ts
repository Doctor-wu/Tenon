import { IHeaderBarItem, ToolBarConfigType } from "../configs";
import { WorkbenchType } from "../core";
import { ProvideService } from "../services";

export type HeaderBarControllerResult = Promise<Partial<IHeaderBarItem>>;

export type ToolBarControllerResult = Promise<Partial<ToolBarConfigType>>;

export const UIControllerKey = Symbol('UIController');

export const HeaderBarController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<() => Promise<HeaderBarControllerResult>>
  ) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateHeaderBarConfig(name, config);
    }
  }
};

export const ToolBarController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<() => Promise<ToolBarControllerResult>>) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateToolBarConfig(name, config);
    }
  }
}