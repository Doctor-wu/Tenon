export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
  });

  onBeforeMount(() => {
    watch(() => {
      props.containerStyle.width = `${props.compProps.span / 12 * 100}%`;
      props.containerStyle.marginLeft = `${props.compProps.offset / 12 * 100}%`;
    });
  });

  const log = () => {
    console.log("Col");
  }

  return {
    author: 'Doctorwu',
    log,
  }
}