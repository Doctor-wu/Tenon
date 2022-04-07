export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onBeforeMount(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
  });

  return {
    author: 'Doctorwu',
  }
}