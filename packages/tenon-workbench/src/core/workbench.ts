import { WorkbenchDIServiceCore } from '../services/di-service';
import { FeatureNameKey, ActionControllerKey, Service } from '../decorators';
import { IWorkbenchAdapter } from './adapter';
import { newable, Singleton } from '@tenon/shared';
import { WorkbenchEvents } from './events';
import { createServiceTag, DynamicFeatureTag } from '../services/tag';
import { WorkbenchLoader } from './workbench-loader';
import { App, createApp, h } from 'vue';
import WorkbenchComponent from '../components/workbench.vue';
import { BarConfig, HeaderBarConfig } from './config';
import { UIControllerKey } from '../decorators/ui-controller';
import { EventEmitterCore } from '../services/event-emitter';

export interface IWorkbenchConfig {
  syncFeatures: any[];
  dynamicTags: DynamicFeatureTag[];

  // 用于配置头部栏，工具栏，底部栏
  controllers: any[];

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
  controllers: any[];
  eventEmitter: EventEmitterCore;
  barConfig: BarConfig;
}

export type WorkbenchType = IWorkbenchAdapter & WorkbenchLoader & IWorkbench;

export const WorkbenchService = createServiceTag('WorkbenchService');

// @ts-ignore
export const inheritFromWorkbench = (Target: newable<any, WorkbenchType>, config: IWorkbenchConfig) => {
  const {
    syncFeatures,
    dynamicTags,
    headerBarConfig,
    controllers,
  } = config;

  @Service({
    name: WorkbenchService,
  })
  @Singleton
  class Workbench extends Target implements IWorkbench {
    public app!: App;

    public syncFeatures: any[] = [];
    public dynamicTags: Set<DynamicFeatureTag> = new Set();

    public controllers = controllers;

    public keyBoardService: any;
    public contextService: any;
    public eventEmitter = new EventEmitterCore();

    public workbenchDIState = new WorkbenchDIServiceCore();

    public barConfig: BarConfig = new BarConfig(headerBarConfig);

    constructor(
      ...args: any[]
    ) {
      super(...args);
      this.initEvents();
    }

    public initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]) {
      this.syncFeatures = syncFeatures;
      dynamicTags.forEach(tag => this.dynamicTags.add(tag));
      this.syncFeatures.forEach(feature => {
        this.workbenchDIState.mount(feature[FeatureNameKey]);
      });
    }

    public initControllers() {
      this.controllers.forEach(controller => {
        Object.keys(controller.prototype[ActionControllerKey]).forEach(nameKey => {
          Object.keys(controller.prototype[ActionControllerKey][nameKey]).forEach(actionKey => {
            controller.prototype[ActionControllerKey][nameKey][actionKey].forEach(cb => {
              this.barConfig.regisAction(nameKey, actionKey, cb);
            });
          });
        });
        Object.keys(controller.prototype[UIControllerKey]).forEach(nameKey => {
          controller.prototype[UIControllerKey][nameKey](this);
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

  return Workbench;
}