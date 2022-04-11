export default (lifeCycle, props, ctx, tenonComp) => {

  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  } = lifeCycle;

  if (!tenonComp.propsBinding.hasBinding('formConfig', 'model')) {
    tenonComp.propsBinding.addBinding('formConfig', 'model', '$comp.states.formModel');
  }
  let form;

  onMounted(() => {
    // console.log(lifeCycle, props, ctx, tenonComp);
    form = tenonComp.refs?.form;
  });

  const resetFields = (...args) => form.resetFields(...args);

  const clearValidate = (...args) => form.clearValidate(...args);

  const validate = (...args) => form.clearValidate(...args);

  const validateField = (...args) => form.validateField(...args);

  return {
    author: 'Doctorwu',
    resetFields,
    clearValidate,
    validate,
    validateField,
    formModel: {}
  }
}
