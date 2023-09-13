import { TenonComponent } from "@tenon/legacy-engine";

export default (lifeCycle, props, ctx, tenonComp: TenonComponent, editMode) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    if (!tenonComp.propsBinding.hasBinding('containerStyle', 'padding')) {
      tenonComp.propsBinding.addBinding('containerStyle', 'padding', "(_editMode.value && $comp.props.IfConfig.render) ? '3px' : '0'");
    }
  });

  return {
    author: 'Doctorwu',
    getEditMode: () => {
      return editMode;
    },
  }
}
