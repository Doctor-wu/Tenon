import { Subscribe } from '@tenon/shared';
import { FeatureNameKey } from '../decorators';
import { workbenchDIState } from './di-state';
import { WorkbenchEvents } from './events';
import { DynamicFeatureTag } from './tag';
export interface IWorkbenchConfig {
  // el: HTMLElement;
  // editor adapter
  // adapter: any;

  // feature tags
  // syncTags: SyncFeatureTag[];
  syncFeatures: any[];
  dynamicTags: DynamicFeatureTag[];

  // 用于配置头部栏，工具栏，底部栏
  actionControllers: any[];
  uiControllers: any[];

  // 注册头部栏，工具栏，底部栏配置
  headBarConfig: any;
  toolBarConfig: any;
  footBarConfig: any;

  // 键盘事件管理服务
  keyBoardConfig: any;
};

// @ts-ignore
export const inheritFromWorkbench = (Target: any, config: IWorkbenchConfig) => {
  const {
    syncFeatures,
    dynamicTags,
  } = config;

  return class Workbench extends Target {

    public syncFeatures: any[] = [];
    public dynamicTags: Set<DynamicFeatureTag> = new Set();

    public keyBoardService: any;
    public contextService: any;
    public eventEmitter = new Subscribe();

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

    public initEvents() {
      this.eventEmitter.on(
        WorkbenchEvents.Load,
        this.onLoad.bind(this),
      );
    }

    public onLoad(el: HTMLElement) {
      console.log('workbench load', el);
      this.initFeatureTags(syncFeatures, dynamicTags);
    }
  };
}