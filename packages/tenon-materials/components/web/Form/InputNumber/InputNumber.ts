export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('inputNumberConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('inputNumberConfig', 'model-value', '$comp.states.numberValue');
  }
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.numberValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('inputNumberConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onClear") {
        const bindingExpression = tenonComp.propsBinding.getBinding('inputNumberConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ''`);
      }
    });
  });

  return {
    author: 'Doctorwu',
    numberValue: 0,
  }
}
