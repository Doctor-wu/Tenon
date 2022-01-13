export default (lifeCycle, props, ctx, tenonComp) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onBeforeMount(() => {
    console.log(lifeCycle, props, ctx, tenonComp);
    setTimeout(() => {
      tenonComp.states.items.push(
        "https://tse1-mm.cn.bing.net/th/id/R-C.a322e587792a346cef2e77ee98a4c681?rik=I29Sn8%2f0IPvgig&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2faa8a8edb964bfcee870748c8d61f74f546051b67.jpg&ehk=8hQuZ17Fya431ndZ3TfpBML0fcva5czqnitRtUO9GPE%3d&risl=&pid=ImgRaw&r=0"
      );
    }, 5000);
  });

  return {
    author: 'Doctorwu',
    items: [
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
    ]
  }
}