export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,watch
  } = lifeCycle;
  onMounted(() => {
    // console.log(tenonComp);
  });

  return {
    author: 'Doctorwu',
    icon: 'icon-user'
  }
}