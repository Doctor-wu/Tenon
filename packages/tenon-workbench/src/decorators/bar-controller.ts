import { FootBarItemType, HeaderBarItemType, ToolBarItemType } from "../configs";
import { WorkbenchType } from "../core";
import { ProvideService } from "../services";

export type HeaderBarControllerResult = Promise<Partial<HeaderBarItemType>>;

export type ToolBarControllerResult = Promise<Partial<ToolBarItemType>>;

export type FootBarControllerResult = Promise<Partial<FootBarItemType>>;

export const UIControllerKey = Symbol('UIController');

export const HeaderBarController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<HeaderBarControllerResult>>
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
  return (target, propertyKey, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<ToolBarControllerResult>>) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateToolBarConfig(name, config);
    }
  }
}

export const FootBarController = (name: any) => {
  return (target, propertyKey, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<FootBarControllerResult>>) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateFootBarConfig(name, config);
    }
  }
}
