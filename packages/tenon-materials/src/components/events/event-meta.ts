import { Bridge } from "@tenon/shared";
import { Ref } from "vue";
import { TenonEventPrefix, createTenonEvent } from "./constant";
import { TenonComponentLifeCycle, useComponentLifeCycle } from "./lifecycle";
import { ElementChangeEvent, RendererHost } from "@tenon/engine";

export interface IMaterialEventMeta {
  trigger: (el: HTMLElement, trigger: (e: Event) => void) => void;
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

export const useEventMeta = (
  renderer: RendererHost,
  eventMeta: (IMaterialEventMeta | IMaterialInternalEventMeta)[],
  elRef: Ref<HTMLElement | null>,
  bridge: Bridge<Record<string | number | symbol, any>>,
) => {
  useComponentLifeCycle(
    renderer,
    TenonComponentLifeCycle.Mount,
    () => {
      eventMeta.forEach((meta) => {
        if ("internal" in meta) return;
        if (!elRef.value) {
          console.error("elRef is not ready");
          return;
        }
        meta.trigger(elRef.value!, (e) => {
          bridge.run(`${TenonEventPrefix}${meta.name}`, e);
        });
      });
      bridge.run(
        createTenonEvent(TenonComponentLifeCycle.Mount), elRef
      );
      bridge.run(ElementChangeEvent, elRef);
    },
  );

  useComponentLifeCycle(
    renderer,
    TenonComponentLifeCycle.UnMount,
    () => {
      bridge.run(
        createTenonEvent(TenonComponentLifeCycle.UnMount)
      );
    },
  );
}
