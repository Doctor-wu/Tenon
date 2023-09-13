export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
  });

  return {
    author: 'Doctorwu',
    icon: 'icon-user'
  }
}