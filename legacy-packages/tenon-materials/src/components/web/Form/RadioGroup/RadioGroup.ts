export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('radioGroupConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('radioGroupConfig', 'model-value', '$comp.states.selectValue');
  }
  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const bindingExpression = tenonComp.propsBinding.getBinding('radioGroupConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
    });
  });

  return {
    selectValue: '',
    author: 'Doctorwu',
  }
}
