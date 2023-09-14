import { createServiceTag, createSyncFeatureTag } from "@tenon/workbench";

export const IEditor = createServiceTag("tenon-editor");
export const IConfig = createServiceTag("tenon-editor-config");
export const IContext = createServiceTag("tenon-editor-context");
export const IDataEngine = createServiceTag('tenon-data-engine');
export const IRendererManager = createServiceTag('tenon-renderer-manager');
export const IEventCenter = createServiceTag("tenon-editor-event-center");
export const IStore = createServiceTag("tenon-editor-store");

export interface IFireOptions {
  /**
   * 是否节流, 传入数字则为节流时间
   */
  throttle?: number;
};
