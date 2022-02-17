export default (
  lifeCycle,
  props,
  ctx,
  tenonComp
) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
  });

  return {
    author: 'Doctorwu',
  }
}