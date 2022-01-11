export default (lifeCycle, props, ctx, instance) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx, instance);
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