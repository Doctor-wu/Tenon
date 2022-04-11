export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  tenonComp.propsBinding.addBinding('checkboxGroupConfig', 'model-value', '$comp.states.selected');

  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        tenonComp.states.selected = args[0];
      }
    });
  });

  return {
    selected: [],
    author: 'Doctorwu',
  }
}
