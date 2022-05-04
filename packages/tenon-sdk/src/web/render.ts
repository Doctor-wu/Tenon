import { callTenonPageEvent, eventsMap, IEventMeta, TenonComponent } from "@tenon/engine";
import { App, createApp, effect, h, reactive, Ref, ref, watch } from "vue";
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
      }
    });
    this.vm.use(ArcoVue);
    this.vm.use(ArcoVueIcon);
    this.setLoading();
    setTimeout(() => {
      this.vm.mount(this.app.config.el);
    });
  }

  setLoading() {
    this.renderFunc.value = () => h(Skeleton, {
      animation: true,
      style: {
        // display: 'flex',
        height: '100vh',
        width: '100%',
        padding: '12px',
        boxSizing: 'border-box',
        // alignItems: 'center',
        // justifyContent: 'center',
      }
    }, h(Space, {
      direction: 'vertical',
      style: {
        width: '100%',
      },
      size: 'large',
    }, [
      h(SkeletonLine, { rows: 3 }),
      h(Space, [h(SkeletonShape, { shape: 'circle' }), h(SkeletonShape, { shape: 'circle' }), h(SkeletonShape)]),
      h(SkeletonLine, { rows: 2 }),
      h(SkeletonShape),
      h(Space, [h(SkeletonShape, { shape: 'circle' }), h(SkeletonShape)]),
      h(SkeletonLine, { rows: 3 }),
      h(Space, [h(SkeletonShape, { shape: 'circle' }), h(SkeletonShape), h(SkeletonShape, { shape: 'circle' })]),
      h(SkeletonLine, { rows: 4 }),
      h(SkeletonShape),
    ]));
  }

  async render(pageInfo: Ref<ITenonWebSDKPageInfo>) {
    // const { tree } = pageInfo;
    watch(pageInfo, async () => {
      const el: HTMLElement | null = typeof this.app.config.el === "string" ? document.querySelector(this.app.config.el) : this.app.config.el;
      console.log(el, this.app.project);
      el!.style.minWidth = this.app.project.projectInfo?.userConfig.screenWidth + 'px';
      el!.style.maxWidth = this.app.project.projectInfo?.userConfig.screenWidth! + 150 + 'px';
      // el!.style.width = pageInfo.value;
      console.log(321, pageInfo.value.tree, this.app.componentsMap);
      console.time('deserialize');
      const rootComponent = TenonComponent.createInstanceByDeserialize(pageInfo.value.tree, this.app.componentsMap);
      console.timeEnd('deserialize');
      console.log(123, rootComponent);
      // TenonComponent.staticHook.
      eventsMap.value = (() => {
        const map = new Map<string, IEventMeta>();
        (pageInfo.value.events || []).forEach(eventItem => {
          map.set(eventItem._id, eventItem);
        });
        return map;
      })();
      await callTenonPageEvent(pageInfo.value, 'onShow');
      console.log(eventsMap.value);
      console.log(pageInfo);

      this.renderFunc.value = () => h(ComposeView, {
        tenonComp: rootComponent,
        tenonCompProps: {},
        root: true,
      });
    }, {
      immediate: true,
    })
  }
}