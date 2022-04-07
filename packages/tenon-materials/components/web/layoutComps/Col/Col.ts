
export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
  });

  let watchCancel;
  onBeforeMount(() => {
    if (!tenonComp.propsBinding.hasBinding('composeLayout', 'padding')) {
      tenonComp.propsBinding.addBinding('composeLayout', 'padding', "_editMode.value ? '3px' : '0'");
    }
    watchCancel = watch(() => {
      if (props.compProps.span > 12) return props.compProps.span = 12;
      if (props.compProps.span < 0) return props.compProps.span = 0;
      if (props.compProps.offset > 12) return props.compProps.offset = 12;
      if (props.compProps.offset < 0) return props.compProps.offset = 0;
      props.containerStyle.width = `${props.compProps.span / 12 * 100}%`;
      props.containerStyle.marginLeft = `${props.compProps.offset / 12 * 100}%`;
    });
  });

  onBeforeUnmount(() => {
    watchCancel();
  });

  return {
    author: 'Doctorwu',
  }
}