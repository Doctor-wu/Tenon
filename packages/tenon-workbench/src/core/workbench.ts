import {
  WorkbenchDIServiceCore, BarServiceCore, EventEmitterCore,
  createServiceTag, DynamicFeatureTag,
  ActionInfo, DrawerServiceCore,
} from '../services';
import { FeatureNameKey, ActionControllerKey, Service, ControllerKeyName } from '../decorators';
import { IWorkbenchAdapter } from './adapter';
import { newable, Singleton } from '@tenon/shared';
import { WorkbenchEvents } from './events';
import { WorkbenchLoader } from './workbench-loader';
import { type App, createApp, h } from 'vue';
import { UIControllerKey } from '../decorators/bar-controller';
import { HeaderBarConfig, ToolBarConfig } from '../interfaces';
import WorkbenchComponent from '../components/workbench.vue';
import { IPlugin } from './base-plugin';

export interface IWorkbenchConfig {
  syncFeatures: newable<any, any>[];
  dynamicTags: DynamicFeatureTag[];

  // 用于配置头部栏，工具栏，底部栏
  controllers: newable<any, any>[];

  // 注册头部栏，工具栏，底部栏配置
  headerBarConfig: HeaderBarConfig;
  toolBarConfig: ToolBarConfig;
  footBarConfig: any;
};

export interface IWorkbench {
  app: App;
  syncFeatures: newable<any, any>[];
  dynamicTags: Set<DynamicFeatureTag>;
  controllers: newable<any, any>[];
  eventEmitter: EventEmitterCore;
  barConfig: BarServiceCore;
  workbenchDIService: WorkbenchDIServiceCore;
  drawerService: DrawerServiceCore;
  registerPlugin(plugins: IPlugin[]): void;
}

type ComposeWorkbench<A extends {}, W extends {}, I extends {}> = A & W & I;

export type WorkbenchType = ComposeWorkbench<IWorkbenchAdapter, WorkbenchLoader, IWorkbench>
export const WorkbenchService = createServiceTag('WorkbenchService');

export const inheritFromWorkbench = (Target: newable<any, WorkbenchType>, config: IWorkbenchConfig) => {
  const {
    syncFeatures,
    dynamicTags,
    headerBarConfig,
    toolBarConfig,
    footBarConfig,
    controllers,
  } = config;

  @Service({
    name: WorkbenchService,
  })
  @Singleton
  class Workbench extends Target implements IWorkbench {
    public app!: App;

    public syncFeatures: newable<any, any>[] = [];
    public dynamicTags: Set<DynamicFeatureTag> = new Set();

    public controllers = controllers;

    public keyBoardService: any;
    public contextService: any;
    public eventEmitter = new EventEmitterCore();

    public workbenchDIService = new WorkbenchDIServiceCore();

    public barConfig: BarServiceCore = new BarServiceCore(
      headerBarConfig,
      toolBarConfig,
      footBarConfig
    );

    public drawerService = new DrawerServiceCore(this.eventEmitter);

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
        this.workbenchDIService.mount(feature.prototype[FeatureNameKey]);
      });
    }

    public initControllers() {
      this.controllers.forEach(Controller => {
        Object.keys(Controller.prototype[ActionControllerKey]).forEach(nameKey => {
          Object.keys(Controller.prototype[ActionControllerKey][nameKey]).forEach(actionKey => {
            Controller.prototype[ActionControllerKey][nameKey][actionKey].forEach(cb => {
              this.barConfig.regisAction(nameKey, actionKey, cb);
            });
          });
        });
        Object.keys(Controller.prototype[UIControllerKey]).forEach(nameKey => {
          Controller.prototype[UIControllerKey][nameKey](this);
        });
        this.workbenchDIService.get(Controller.prototype[ControllerKeyName]);
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
      new ActionInfo(this.eventEmitter);
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
          toolBarConfig: this.barConfig.toolBarConfig,
          footBarConfig: this.barConfig.footBarConfig,
        }),
      });
      this.app.mount(el);
    };

    public registerPlugin(plugins: IPlugin[]) {
      plugins.forEach(plugin => {
        plugin.install(this);
      });
    }
  };

  return Workbench;
}
