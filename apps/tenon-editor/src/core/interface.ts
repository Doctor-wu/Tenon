import { createSyncFeatureTag } from "@tenon/workbench";

export const IEditor = createSyncFeatureTag("tenon-editor");
export const IConfig = createSyncFeatureTag("tenon-editor-config");
export const IContext = createSyncFeatureTag("tenon-editor-context");
export const IEventCenter = createSyncFeatureTag("tenon-editor-event-center");
export const IStore = createSyncFeatureTag("tenon-editor-store");

export interface IFireOptions {
  /**
   * 是否节流, 传入数字则为节流时间
   */
  throttle?: number;
};
