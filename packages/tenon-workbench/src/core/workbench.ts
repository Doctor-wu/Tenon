import { FeatureNameKey } from '../di';
import { workbenchDIState } from './di-state';
import { DynamicFeatureTag, SyncFeatureTag } from "./tag";

export interface IWorkbenchConfig {
  el: HTMLElement;
  // editor adapter
  adapter: any;

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

  // 编辑区域grid配置
  editorGrid: any;

  // 键盘事件管理服务
  keyBoardConfig: any;
}

export class Workbench<Editor extends unknown> {
  private editor?: Editor;

  // private syncTags: Set<SyncFeatureTag> = new Set();
  private syncFeatures: any[] = [];
  private dynamicTags: Set<DynamicFeatureTag> = new Set();

  public keyBoardService: any;
  public contextService: any;


  constructor(config: IWorkbenchConfig) {
    const {
      syncFeatures,
      dynamicTags,
    } = config;
    this.initFeatureTags(syncFeatures, dynamicTags);
  }

  initFeatureTags(syncFeatures: any[], dynamicTags: DynamicFeatureTag[]) {
    this.syncFeatures = syncFeatures;
    dynamicTags.forEach(tag => this.dynamicTags.add(tag));
    syncFeatures.forEach(feature => {
      workbenchDIState.mount(feature[FeatureNameKey]);
    });
  }
}