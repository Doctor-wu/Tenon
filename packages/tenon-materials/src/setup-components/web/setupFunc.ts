import { ComponentTreeNode, TenonComponent, TenonComponentStates } from "@tenon/engine";
import {
  getCurrentInstance,
  onMounted, onUpdated,
  onBeforeUnmount, onBeforeMount,
  reactive, watchEffect
} from "vue";
import { findParentTenonComp } from "./setupRender";

export function setupComponent(props, ctx, logic) {
  const instance = getCurrentInstance();
  const tenonComp: TenonComponent = (instance as any)?.attrs?.tenonComp;
  if (!tenonComp) return;

  tenonComp.ctx = (instance as any)?.ctx;
  tenonComp.ctx.tenonComp = tenonComp.ctx.tenonComp || tenonComp;

  const parentComp: ComponentTreeNode | null = findParentTenonComp(instance);
  if (parentComp) {
    tenonComp.parentComponent = parentComp;
  };


  const originStates = logic?.({
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
    watch: watchEffect,
  }, props, ctx, tenonComp) || {};

  const tenonStates = new TenonComponentStates(originStates, tenonComp);
  const setupStates = reactive(tenonStates.states);
  // tenonComp.states = setupStates;

  tenonComp.ctx._isTenonComp = true;

  return setupStates;
}