export default (
  lifeCycle,
  props,
  ctx,
  tenonComp
) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  
  if (!tenonComp.propsBinding.hasBinding('typoCommonConfig', 'edit-text')) {
    tenonComp.propsBinding.addBinding('typoCommonConfig', 'edit-text', '$comp.props.typoTitle.text');
  }

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const [value] = args;
        tenonComp.states.titleText = value;
        tenonComp.props.typoTitle.text = value;
        if (tenonComp.propsBinding.hasBinding('typoCommonConfig', 'edit-text')) {
          const bindingExpression = tenonComp.propsBinding.getBinding('typoTitle', 'text');
          tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
        }
      }
    });
  })

  return {
    titleText: '',
    author: 'Doctorwu',
  }
}