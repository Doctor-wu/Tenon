export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('inputConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('inputConfig', 'model-value', '$comp.states.inputValue');
  }
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onInput") {
        tenonComp.states.inputValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('inputConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onClear") {
        const bindingExpression = tenonComp.propsBinding.getBinding('inputConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ''`);
      }
    });
  });

  return {
    author: 'Doctorwu',
    inputValue: '',
  }
}
