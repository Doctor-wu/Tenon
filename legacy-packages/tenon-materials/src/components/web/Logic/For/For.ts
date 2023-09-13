import { TenonComponent } from '@tenon/legacy-engine'

export default (lifeCycle, props, ctx, tenonComp: TenonComponent) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    if (!tenonComp.propsBinding.hasBinding('ForConfig', 'loop')) {
      tenonComp.propsBinding.addBinding('ForConfig', 'loop', "[1, 2 , 3]");
    }
    if (!tenonComp.propsBinding.hasBinding('containerStyle', 'padding')) {
      tenonComp.propsBinding.addBinding('containerStyle', 'padding', "_editMode.value ? '3px' : '0'");
    }
  });

  return {
    author: 'Doctorwu',
  }
}
