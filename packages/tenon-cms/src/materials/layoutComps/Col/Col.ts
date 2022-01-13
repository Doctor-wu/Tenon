export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
    setTimeout(() => {
      tenonComp.states.author = 123;
    }, 1000);
  });

  onBeforeMount(() => {
    watch(() => {
      props.containerStyle.width = `${props.compProps.span / 12 * 100}%`;
      props.containerStyle.marginLeft = `${props.compProps.offset / 12 * 100}%`;
    });
  });

  return {
    author: 'Doctorwu',
  }
}