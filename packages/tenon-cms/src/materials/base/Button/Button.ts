export default (lifeCycle, props, ctx) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx);
  });

  return {
    author: 'Doctorwu',
  }
}