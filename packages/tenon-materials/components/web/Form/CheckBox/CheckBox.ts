
export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('checkboxConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('checkboxConfig', 'model-value', '$comp.states.selected');
  }

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.selected = args[0];
        if (tenonComp.tenonCompProps.scopeSlotArgs) {
          tenonComp.tenonCompProps.scopeSlotArgs.checked = args[0];
        }
      }
    });
  });

  return {
    author: 'Doctorwu',
    selected: false,
  }
}
