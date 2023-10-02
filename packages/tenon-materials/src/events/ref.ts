import { RendererHost } from "@tenon/engine";
import { Ref } from "vue";

export const getRefValue = (
  host: RendererHost,
  ref: Ref<HTMLElement | null> | React.RefObject<HTMLElement | null>,
) => {
  switch (host) {
    case RendererHost.React:
      return (ref as React.RefObject<HTMLElement | null>).current;
    case RendererHost.Vue:
      return (ref as Ref<HTMLElement | null>).value;
  }
}
