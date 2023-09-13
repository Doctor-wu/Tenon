export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('switchConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('switchConfig', 'model-value', '$comp.states.switchValue');
  };

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.inputValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('switchConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
    });
  });

  return {
    switchValue: false,
    author: 'Doctorwu',
  }
}
