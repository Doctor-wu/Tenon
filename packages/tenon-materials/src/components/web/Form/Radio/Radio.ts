export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('radioConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('radioConfig', 'model-value', '$comp.states.selectValue');
  }

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.selectValue = args[0];
        if (tenonComp.tenonCompProps.scopeSlotArgs) {
          tenonComp.tenonCompProps.scopeSlotArgs.checked = args[0];
        }
      }
    });
  });

  return {
    selectValue: '',
    author: 'Doctorwu',
  }
}
