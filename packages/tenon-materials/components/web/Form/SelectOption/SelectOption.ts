export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  onMounted(() => {

  });

  return {
    author: 'Doctorwu',
  }
}
