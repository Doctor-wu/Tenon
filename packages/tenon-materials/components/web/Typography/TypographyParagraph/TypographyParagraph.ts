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
    tenonComp.propsBinding.addBinding('typoCommonConfig', 'edit-text', '$comp.props.typoParagraph.text');
  }

  onMounted(() => {
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const [value] = args;
        tenonComp.states.paragraphText = value;
        tenonComp.props.typoParagraph.text = value;
        if (tenonComp.propsBinding.hasBinding('typoCommonConfig', 'edit-text')) {
          const bindingExpression = tenonComp.propsBinding.getBinding('typoParagraph', 'text');
          tenonComp.exec(`${bindingExpression} = ${JSON.stringify(value)}`);
        }
      }
    });
  })

  return {
    paragraphText: '',
    author: 'Doctorwu',
  }
}