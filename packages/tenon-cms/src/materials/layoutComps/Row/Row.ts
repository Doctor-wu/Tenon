import { useStore } from "../../../store";

export default (lifeCycle, props, ctx, instance) => {
  const {
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  } = lifeCycle;
  onMounted(() => {
    console.log(lifeCycle, props, ctx);
    setTimeout(() => {
      console.log(instance);
      instance.ctx.col.offset = 4;
    }, 1000);
    const store = useStore();
    console.log(store.state);
    
  });

  return {
    author: 'Doctorwu',
    col: {
      span: 12,
      offset: 2,
    },
    cols: [{
      span: 10,
      offset: 2,
    },{
      span: 10,
      offset: 2,
    },
    ]
  }
}