export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('inputTagConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('inputTagConfig', 'model-value', '$comp.states.inputValue');
  };

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.inputValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('inputTagConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onRemove") {
        tenonComp.states.inputValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('inputTagConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${bindingExpression}.filter(i => i !== '${value}')`);
      }
      if (eventName === "onClear") {
        const bindingExpression = tenonComp.propsBinding.getBinding('inputTagConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = []`);
      }
    });
  });

  return {
    inputValue: [],
    author: 'Doctorwu',
  }
}
