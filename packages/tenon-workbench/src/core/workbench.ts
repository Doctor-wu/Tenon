import { DynamicFeatureTag, SyncFeatureTag } from "./tag";

export interface IWorkbenchConfig {
  // editor adapter
  adapter: any;

  // feature tags
  syncTags: SyncFeatureTag[];
  dynamicTags: DynamicFeatureTag[];
  
  // 头部栏，工具栏，底部栏配置
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

  private syncTags: Set<SyncFeatureTag> = new Set();
  private dynamicTags: Set<DynamicFeatureTag> = new Set();

  public keyBoardService: any;
  public contextService: any;


  constructor(config: IWorkbenchConfig) {
    const {
      syncTags,
      dynamicTags,
    } = config;
    this.initFeatureTags(syncTags, dynamicTags);
  }

  initFeatureTags(syncTags: SyncFeatureTag[], dynamicTags: DynamicFeatureTag[]) {
    syncTags.forEach(tag => this.syncTags.add(tag));
    dynamicTags.forEach(tag => this.syncTags.add(tag));
  }
}