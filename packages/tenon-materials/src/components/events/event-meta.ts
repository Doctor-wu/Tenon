import { Bridge } from "@tenon/shared";
import { onMounted, onBeforeUnmount, Ref, watch } from "vue";
import { TenonEventPrefix } from "./constant";

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

export enum MaterialInternalEvent {
  Mount = 'onMount',
  UnMount = 'UnMount',
};

export const internalMeta: IMaterialInternalEventMeta[] = [
  {
    name: MaterialInternalEvent.Mount,
    desc: '组件挂载时',
    internal: true,
  },
  {
    name: MaterialInternalEvent.UnMount,
    desc: '组件卸载时',
    internal: true,
  },
];

export const useEventMeta = (
  eventMeta: (IMaterialEventMeta | IMaterialInternalEventMeta)[],
  elRef: Ref<HTMLElement | undefined>,
  materialInstanceBridge: Bridge<Record<string | number | symbol, any>>,
) => {
  onMounted(() => {
    eventMeta.forEach((meta) => {
      if ("internal" in meta) return;
      if (!elRef.value) {
        console.error("elRef is not ready");
        return;
      }
      meta.trigger(elRef.value, (e) => {
        materialInstanceBridge.run(`${TenonEventPrefix}${meta.name}`, e);
      });
    });
    materialInstanceBridge.run(
      `${TenonEventPrefix}${MaterialInternalEvent.Mount}`, elRef
    );
  materialInstanceBridge.run(`${TenonEventPrefix}__element_change__`, elRef);
  });

  onBeforeUnmount(() => {
    materialInstanceBridge.run(
      `${TenonEventPrefix}${MaterialInternalEvent.UnMount}`
    );
  });
}
