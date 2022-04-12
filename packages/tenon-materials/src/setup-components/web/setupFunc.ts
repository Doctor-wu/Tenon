import { callTenonEvent, ComponentTreeNode, LifeCycleHooksKey, TenonComponent, TenonComponentStates } from "@tenon/engine";
import {
  getCurrentInstance,
  onMounted, onUpdated,
  onBeforeUnmount, onBeforeMount,
  reactive, watchEffect, watch
} from "vue";
import { findParentTenonComp } from "./setupRender";

export function setupComponent(props, ctx, logic) {
  const instance = getCurrentInstance();
  const tenonComp: TenonComponent = (instance as any)?.attrs?.tenonComp;
  if (!tenonComp) return;

  tenonComp.ctx = (instance as any)?.ctx;
  tenonComp.ctx.tenonComp = tenonComp.ctx.tenonComp || tenonComp;
  Object.assign(tenonComp.ctx, tenonComp.props, tenonComp.states);

  const parentComp: TenonComponent | null = findParentTenonComp(instance);

  onBeforeMount(() => {
    callTenonEvent(tenonComp, 'onBeforeMount');
    tenonComp.lifecycleHook.executeHook(LifeCycleHooksKey.onBeforeMount);
  });

  onMounted(() => {
    callTenonEvent(tenonComp, 'onMounted');
    tenonComp.lifecycleHook.executeHook(LifeCycleHooksKey.onMounted);
  });

  onBeforeUnmount(() => {
    callTenonEvent(tenonComp, 'onBeforeUnmount');
    tenonComp.lifecycleHook.executeHook(LifeCycleHooksKey.onBeforeUnmount);
  });

  const originStates = logic?.({
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
    watch,
  }, props, ctx, tenonComp, TenonComponent.editMode) || {};

  Object.keys(originStates || {}).forEach(key => {
    if (typeof originStates[key] === 'function') {
      tenonComp.handlers.push(key);
    }
  });
  tenonComp.lifecycleHook.executeHook(LifeCycleHooksKey.onSetup);

  const tenonStates = new TenonComponentStates(originStates, tenonComp);
  const setupStates = tenonStates.states;
  tenonComp.states = tenonStates;

  tenonComp.ctx._isTenonComp = true;

  return setupStates;
}