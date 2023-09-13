export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('checkboxGroupConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('checkboxGroupConfig', 'model-value', '$comp.states.selected');
  }
  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const bindingExpression = tenonComp.propsBinding.getBinding('checkboxGroupConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
    });
  });

  return {
    selected: [],
    author: 'Doctorwu',
  }
}
