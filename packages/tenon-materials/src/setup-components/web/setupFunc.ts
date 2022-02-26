import { ComponentTreeNode, eventsMap, TenonComponentStates } from "@tenon/engine";
import { getCurrentInstance, onMounted, onUpdated, onBeforeUnmount, onBeforeMount, reactive, watchEffect } from "vue";
import { setupComponentEvents } from "./setupEvents";
import { findParentTenonComp } from "./setupRender";

export function setupComponent(props, ctx, logic) {
  const instance = getCurrentInstance();
  const tenonComp: ComponentTreeNode = (instance as any)?.ctx.$attrs.tenonComp;

  tenonComp.ctx = (instance as any)?.ctx;
  tenonComp.ctx.tenonComp = tenonComp.ctx.tenonComp || tenonComp;

  const parentComp: ComponentTreeNode | null = findParentTenonComp(instance);
  if (parentComp) {
    if (tenonComp.refKey) {
      parentComp.refs = parentComp.refs || {};
      parentComp.refs[tenonComp.refKey] = parentComp.refs[tenonComp.refKey] || tenonComp;
    }
    tenonComp.parentComponent = parentComp;
  };

  setupComponentEvents(tenonComp);

  const originStates = logic?.({
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
    watch: watchEffect,
  }, props, ctx, tenonComp) || {};

  const handlers = reactive<string[]>([]);
  Object.keys(originStates).forEach(key => {
    if (typeof originStates[key] === "function") {
      handlers.push(key);
      eventsMap.set(`${key}_${tenonComp.id}`, originStates[key]);
    }
  });
  const tenonStates = new TenonComponentStates(originStates, tenonComp);
  const setupStates = reactive(tenonStates);

  tenonComp.states = setupStates;
  tenonComp.handlers = handlers;
  tenonComp.ctx._isTenonComp = true;

  return setupStates;
}