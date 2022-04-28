export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('selectConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('selectConfig', 'model-value', '$comp.states.innerSelectValue');
  };
  if (!tenonComp.propsBinding.hasBinding('selectValue', 'value')) {
    tenonComp.propsBinding.addBinding('selectValue', 'value', '[1, 2, 3]');
  };

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.inputValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('selectConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onRemove") {
        tenonComp.states.inputValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('selectConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${bindingExpression}.filter(i => i !== '${value}')`);
      }
      if (eventName === "onClear") {
        const bindingExpression = tenonComp.propsBinding.getBinding('selectConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = []`);
      }
    });
  });

  return {
    innerSelectValue: "",
    author: 'Doctorwu',
  }
}
