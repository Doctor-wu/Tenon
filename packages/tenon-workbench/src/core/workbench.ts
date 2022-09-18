import { IWorkbenchAdapter } from './adapter';
import { newable, Subscribe } from '@tenon/shared';
import { FeatureNameKey, ActionControllerKey } from '../decorators';
import { workbenchDIState } from './di-state';
import { WorkbenchEvents } from './events';
import { DynamicFeatureTag } from './tag';
import { WorkbenchLoader } from './workbench-loader';
import { App, createApp, h } from 'vue';
import WorkbenchComponent from '../components/workbench.vue';
import { BarConfig, HeaderBarConfig } from './config';
export interface IWorkbenchConfig {
  syncFeatures: any[];
  dynamicTags: DynamicFeatureTag[];

  // 用于配置头部栏，工具栏，底部栏
  actionControllers: any[];
  uiControllers: any[];

  // 注册头部栏，工具栏，底部栏配置
  headerBarConfig: HeaderBarConfig;
  toolBarConfig: any;
  footBarConfig: any;

  // 键盘事件管理服务
  keyBoardConfig: any;
};

export interface IWorkbench {
  app: App;
  syncFeatures: any[];
  dynamicTags: Set<DynamicFeatureTag>;
  actionControllers: any[];
  eventEmitter: Subscribe;
  barConfig: BarConfig;
}

export type WorkbenchType = IWorkbenchAdapter & WorkbenchLoader & IWorkbench;

// @ts-ignore
export const inheritFromWorkbench = (Target: newable<any, WorkbenchType>, config: IWorkbenchConfig) => {
  const {
    syncFeatures,
    dynamicTags,
    headerBarConfig,
    actionControllers,
  } = config;

  return class Workbench extends Target implements IWorkbench{
    public app!: App;

    public syncFeatures: any[] = [];
    public dynamicTags: Set<DynamicFeatureTag> = new Set();

    public actionControllers: any[] = actionControllers;

    public keyBoardService: any;
    public contextService: any;
    public eventEmitter = new Subscribe();

    public barConfig = new BarConfig(
      headerBarConfig,
    );

    constructor(...args: any[]) {
      super(...args);
      this.initEvents();
    }

    public initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]) {
      this.syncFeatures = syncFeatures;
      dynamicTags.forEach(tag => this.dynamicTags.add(tag));
      this.syncFeatures.forEach(feature => {
        workbenchDIState.mount(feature[FeatureNameKey]);
      });
    }

    public initControllers() {
      this.actionControllers.forEach(controller => {
        console.log(controller);
        Object.keys(controller.prototype[ActionControllerKey]).forEach(nameKey => {
          Object.keys(controller.prototype[ActionControllerKey][nameKey]).forEach(actionKey => {
            controller.prototype[ActionControllerKey][nameKey][actionKey].forEach(cb => {
              this.barConfig.regisAction(nameKey, actionKey, cb);
            });
          });
        });
      });
    }

    public initEvents() {
      this.eventEmitter.on(
        WorkbenchEvents.Load,
        this.onLoad.bind(this),
      );
      this.eventEmitter.on(
        WorkbenchEvents.EditorRootMount,
        this.attachEditor.bind(this),
      );
    }

    public onLoad(el: HTMLElement) {
      console.log('workbench load', el);
      this.initFeatureTags(syncFeatures, dynamicTags);
      this.initControllers();
      this.render(el);
    }

    public render(el) {
      this.app = createApp({
        render: () => h(WorkbenchComponent, {
          workbenchInstance: this,
          headerBarConfig: this.barConfig.headerBarConfig,
        }),
      });
      this.app.mount(el);
    };
  };
}