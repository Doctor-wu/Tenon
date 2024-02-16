import { Bridge, Disposer } from "@tenon/shared";
import { Ref } from "vue";
import { TenonEventPrefix, createTenonEvent } from "./constant";
import { TenonComponentLifeCycle, useComponentLifeCycle } from "./lifecycle";
import { ElementChangeEvent, RendererHost } from "@tenon/engine";

export interface IMaterialEventMeta {
  trigger: (el: HTMLElement, trigger: (e: Event) => void) => Disposer;
  desc: string;
  name: string;
}
export interface IMaterialInternalEventMeta {
  name: string;
  desc: string;
  internal: true;
}

export const internalMeta: IMaterialInternalEventMeta[] = [
  {
    name: TenonComponentLifeCycle.Mount,
    desc: '组件挂载时',
    internal: true,
  },
  {
    name: TenonComponentLifeCycle.UnMount,
    desc: '组件卸载时',
    internal: true,
  },
];

export const registerCommonHooks = (
  renderer: RendererHost,
  eventMeta: (IMaterialEventMeta | IMaterialInternalEventMeta)[],
  bridge: Bridge<Record<string | number | symbol, any>>,
) => {
  const onElementChange = (elRef?: HTMLElement) => {
    eventMeta.forEach((meta) => {
      if ("internal" in meta) return;
      if (!elRef) {
        console.error("elRef is not ready");
        return;
      }
      meta.trigger(elRef!, (e) => {
        bridge.run(`${TenonEventPrefix}${meta.name}`, e);
      });
    });
  };
  bridge.register(ElementChangeEvent, onElementChange);

  useComponentLifeCycle(
    renderer,
    TenonComponentLifeCycle.Mount,
    () => {
      bridge.run(
        createTenonEvent(TenonComponentLifeCycle.Mount)
      );
    },
  );

  useComponentLifeCycle(
    renderer,
    TenonComponentLifeCycle.UnMount,
    () => {
      bridge.run(
        createTenonEvent(TenonComponentLifeCycle.UnMount)
      );
      bridge.unRegister(ElementChangeEvent, onElementChange);
    },
  );
}
