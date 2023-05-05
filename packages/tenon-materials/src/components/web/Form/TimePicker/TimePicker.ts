export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('timePickerConfig', 'model-value')) {
    tenonComp.propsBinding.addBinding('timePickerConfig', 'model-value', '$comp.states.timeValue');
  }
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const [value, date, dateString] = args;
        tenonComp.states.timeValue = date;

        const bindingExpression = tenonComp.propsBinding.getBinding('timePickerConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
      }
      if (eventName === "onClear") {
        const [value, date, dateString] = args;
        const bindingExpression = tenonComp.propsBinding.getBinding('timePickerConfig', 'model-value');
        tenonComp.exec(`${bindingExpression} = ${JSON.stringify(date)}`);
      }
    });
  });

  return {
    timeValue: '',
    author: 'Doctorwu',
  }
}
