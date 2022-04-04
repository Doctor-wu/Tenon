import { TenonComponent } from "@tenon/engine";

export default (lifeCycle, props, ctx, tenonComp: TenonComponent, editMode) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    tenonComp.propsBinding.addBinding('containerStyle', 'padding', "(_editMode.value && $comp.props.IfConfig.render) ? '3px' : '0'");
  });

  return {
    author: 'Doctorwu',
    getEditMode: () => {
      return editMode;
    },
  }
}