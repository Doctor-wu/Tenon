export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('datePickerConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('datePickerConfig', 'model-value', '$comp.states.dateValue');
  }
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const [value, date, dateString] = args;
        tenonComp.states.dateValue = date;

        const bindingExpression = tenonComp.propsBinding.getBinding('datePickerConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onClear") {
        const [value, date, dateString] = args;
        const bindingExpression = tenonComp.propsBinding.getBinding('datePickerConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(date)}`);
      }
    });
  });

  return {
    author: 'Doctorwu',
    dateValue: Date.now(),
  }
}
