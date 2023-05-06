export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('textareaConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('textareaConfig', 'model-value', '$comp.states.textareaValue');
  }
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onInput") {
        tenonComp.states.textareaValue = args[0];

        const bindingExpression = tenonComp.propsBinding.getBinding('textareaConfig', 'model-value');
        const value = args[0];
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onClear") {
        const bindingExpression = tenonComp.propsBinding.getBinding('textareaConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ''`);
      }
    });
  });

  return {
    textareaValue: '',
    author: 'Doctorwu',
  }
}
