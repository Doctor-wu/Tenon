import {
  FootBarItemType,
  HeaderBarItemType,
  ToolBarItemType,
} from "../interfaces";
import { WorkbenchType } from "../core";
import { ProvideService } from "../services";
import { MaybeRefOrGetter, Ref, watch } from "vue";

export type HeaderBarControllerResult = Promise<Partial<HeaderBarItemType>>;

export type ToolBarControllerResult = Promise<Partial<ToolBarItemType>>;

export type FootBarControllerResult = Promise<Partial<FootBarItemType>>;

export const UIControllerKey = Symbol("UIController");

export const HeaderBarController = (name: any, deps: Ref[] = []) => {
  return (
    target,
    propertyKey,
    desc: TypedPropertyDescriptor<
      (...args: any[]) => Promise<HeaderBarControllerResult>
    >
  ) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateHeaderBarConfig(name, config);
      if (deps.length) {
        watch(
          deps,
          async () => {
            const config = await cb.call(target);
            workbench.barConfig.updateHeaderBarConfig(name, config);
          },
          { immediate: false }
        );
      }
    };
  };
};

export const ToolBarController = (name: any, deps?: MaybeRefOrGetter[]) => {
  return (
    target,
    propertyKey,
    desc: TypedPropertyDescriptor<
      (...args: any[]) => Promise<ToolBarControllerResult>
    >
  ) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const update = async () => {
        const config = await cb.call(target);
        workbench.barConfig.updateToolBarConfig(name, config);
      }
      if (deps?.length) {
        debugger
        watch(
          deps,
          async () => {
            update()
          },
          { immediate: true, deep: true }
        );
      }
    };
  };
};

export const FootBarController = (name: any, deps: Ref[] = []) => {
  return (
    target,
    propertyKey,
    desc: TypedPropertyDescriptor<
      (...args: any[]) => Promise<FootBarControllerResult>
    >
  ) => {
    ProvideService(target, propertyKey, desc);
    const cb = desc.value!;
    target[UIControllerKey] = target[UIControllerKey] || {};
    target[UIControllerKey][name] = async function (workbench: WorkbenchType) {
      const config = await cb.call(target);
      workbench.barConfig.updateFootBarConfig(name, config);
      if (deps.length) {
        watch(
          deps,
          async () => {
            const config = await cb.call(target);
            workbench.barConfig.updateFootBarConfig(name, config);
          },
          { immediate: false }
        );
      }
    };
  };
};
