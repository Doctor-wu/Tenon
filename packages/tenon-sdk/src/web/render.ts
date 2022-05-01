import { callTenonPageEvent, eventsMap, IEventMeta, TenonComponent } from "@tenon/engine";
import { App, createApp, h, reactive, Ref, ref } from "vue";
import { ITenonWebSDKConfig, TenonWebSDK } from "./app";
import { ITenonWebSDKPageInfo } from "./page";
import ComposeView from './components/Compose-View/Compose-View.vue';
import ArcoVue, { Skeleton, SkeletonLine, SkeletonShape, Space, Spin } from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import '@arco-design/web-vue/dist/arco.css';
// import 'vue-color-kit/dist/vue-color-kit.css';
export class TenonWebSDKRenderer {
  private app: TenonWebSDK;
  private vm: App<Element>;
  private renderFunc: Ref<null | Function> = ref(null);

  constructor(app: TenonWebSDK) {
    this.app = app;
    this.vm = createApp({
      render: () => {
        if (this.renderFunc.value) return this.renderFunc.value();
        // <a-skeleton :animation="animation">
        //   <a-space direction="vertical" :style="{width:'100%'}" size="large">
        //     <a-skeleton-line :rows="3" />
        //     <a-skeleton-shape />
        //   </a-space>
        // </a-skeleton>
        return h(Skeleton, {
          animation: true,
          style: {
            display: 'flex',
            height: '100vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }, h(Space, {
          direction: 'vertical',
          style: {
            width: '100%',
          },
          size: 'large',
        }, [
          h(SkeletonLine, {rows: 3}),
          h(SkeletonShape),
          h(SkeletonLine, {rows: 2}),
          h(SkeletonShape),
          h(SkeletonShape),
          h(SkeletonLine, {rows: 3}),
          h(SkeletonShape),
          h(SkeletonLine, {rows: 4}),
          h(SkeletonShape),
        ]));
      }
    });
    this.vm.use(ArcoVue);
    this.vm.use(ArcoVueIcon);
    setTimeout(() => {
      this.vm.mount(this.app.config.el);
    });
  }

  async render(pageInfo: ITenonWebSDKPageInfo) {
    const { el } = this.app.config;
    const { tree } = pageInfo;
    console.log(321, tree, this.app.componentsMap);
    const rootComponent = TenonComponent.createInstanceByDeserialize(tree, this.app.componentsMap);
    console.log(123, rootComponent);
    // TenonComponent.staticHook.
    eventsMap.value = (() => {
      const map = new Map<string, IEventMeta>();
      (pageInfo.events || []).forEach(eventItem => {
        map.set(eventItem._id, eventItem);
      });
      return map;
    })();
    await callTenonPageEvent(pageInfo, 'onShow');
    console.log(eventsMap.value);
    console.log(pageInfo);

    this.renderFunc.value = () => h(ComposeView, {
      tenonComp: rootComponent,
      tenonCompProps: {},
    });
  }
}