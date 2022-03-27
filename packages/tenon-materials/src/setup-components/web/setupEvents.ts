import { callTenonEvent, TenonComponent } from "@tenon/engine";

export function setupComponentEvents(tenonComp: TenonComponent, props: any) {
  const events = tenonComp.materialConfig.events;
  if (!events) return;
  Object.keys(tenonComp.events).forEach(key => {
    props[key] = (...args) => { callTenonEvent(tenonComp, key, ...args) };
  });
}