import { RendererHost } from "@tenon/engine";
import { useEffect } from "react";
import { onMounted, onUnmounted } from "vue";

export enum TenonComponentLifeCycle {
  Mount = 'onMount',
  UnMount = 'onUnMount',
}

export const RendererHostLifeCycleRequest: {
  [Host in RendererHost]: {
    [LifeCycle in TenonComponentLifeCycle]: (fn: any) => void;
  };
} = {
  [RendererHost.Vue]: {
    [TenonComponentLifeCycle.Mount]: (fn: any) => {
      onMounted(fn);
    },
    [TenonComponentLifeCycle.UnMount]: (fn: any) => {
      onUnmounted(fn);
    },
  },
  [RendererHost.React]: {
    [TenonComponentLifeCycle.Mount]: (fn: any) => {
      return useEffect(fn, []);
    },
    [TenonComponentLifeCycle.UnMount]: (fn: any) => {
      useEffect(() => {
        return fn;
      }, []);
    },
  },
}

export const useComponentLifeCycle = (
  host: RendererHost,
  lifeCycle: TenonComponentLifeCycle,
  fn: any,
) => {
  RendererHostLifeCycleRequest[host][lifeCycle](fn);
}
