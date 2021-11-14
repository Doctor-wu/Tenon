import { ref } from "vue";
import { useStore } from "../store";
import { editMode } from "./viewer-status";

export let choosingWrapper = ref(-1);

export const handleSelectComponent = (e: MouseEvent, ctx) => {
  e.stopPropagation();
  if (!editMode) return;
  const store = useStore();
  store.dispatch("viewer/setActiveComponent", ctx.config);
}

export const handleClickOuterPanel = (e: MouseEvent, panel?: HTMLElement) => {
  if (!panel) return;
  if (!panel.contains(e.target as Node)) {
    const store = useStore();
    store.dispatch("viewer/setActiveComponent", null);
  }
}