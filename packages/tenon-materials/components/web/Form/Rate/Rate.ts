export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('rateConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('rateConfig', 'model-value', '$comp.states.rateValue');
  }

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const bindingExpression = tenonComp.propsBinding.getBinding('rateConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
    });
  });

  return {
    rateValue: 3,
    author: 'Doctorwu',
  }
}
