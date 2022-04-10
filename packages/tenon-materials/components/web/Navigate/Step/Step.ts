export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    // watch(tenonComp.slots["default"].children, () => {
    //   debugger;
    //   tenonComp.ctx.$forceUpdate();
    // });
  });

  return {
    author: 'Doctorwu',
  }
}