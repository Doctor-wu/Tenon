export default (lifeCycle, props, ctx, tenonComp) => {
  
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  onMounted(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
  });

  const add = () => {
    tenonComp.states.count.value++;
    tenonComp.ctx.$forceUpdate();
    console.log(tenonComp.states.count.value);
  }

  return {
    count: {
      value: 0,
    },
    author: 'Doctorwu',
    add,
  }
}