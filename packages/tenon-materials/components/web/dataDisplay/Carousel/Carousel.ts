export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
  });

  return {
    author: 'Doctorwu',
    items: [
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
    ],
  }
}