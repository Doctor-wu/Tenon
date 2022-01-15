export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,watch
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
    tenonComp.refs['$rootRef'].onClick(() => {
      console.log(111);
    })
  });

  return {
    author: 'Doctorwu',
    icon: 'icon-camera'
  }
}