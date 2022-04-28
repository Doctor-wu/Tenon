export default (
  lifeCycle,
  props,
  ctx,
  tenonComp
) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onBeforeMount(() => {
  });

  return {
    author: 'Doctorwu',
  }
}