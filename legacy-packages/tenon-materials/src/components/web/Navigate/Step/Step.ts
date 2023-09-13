export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount, watch
  } = lifeCycle;
  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.eventCalledHook.onCalled((eventName, ...args) => {
      if (eventName === "onChange") {
        const value = args[0];
        tenonComp.props.stepConfig.current = value;
      }
    })
    // watch(tenonComp.slots["default"].children, () => {
    //   debugger;
    //   tenonComp.ctx.$forceUpdate();
    // });
  });

  return {
    author: 'Doctorwu',
  }
}