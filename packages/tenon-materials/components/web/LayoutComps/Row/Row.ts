export default (
  lifeCycle,
  props,
  ctx,
  tenonComp
) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onBeforeMount(() => {
    props.composeLayout.display = 'flex';
    props.composeLayout.flexWrap = 'wrap';
    if (!tenonComp.propsBinding.hasBinding('composeLayout', 'padding')) {
      tenonComp.propsBinding.addBinding('composeLayout', 'padding', "_editMode.value ? '3px' : '0'");
    }
  });

  return {
    author: 'Doctorwu',
  }
}