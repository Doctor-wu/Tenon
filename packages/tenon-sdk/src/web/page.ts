import { Subscribe } from "@tenon/shared";
import { ComponentSerializeConfig, IEventMeta } from "@tenon/engine";
import { reactive, Ref, ref } from "vue";
import { TenonWebSDK } from "./app";
import { cloneDeep } from "lodash";

export enum SDKPageEvents {
  PageInfo_Changed = "pageInfo_changed",
}

export interface ITenonWebSDKPageInfo {
  belongProjectId: string;
  pageName: string;
  tree: ComponentSerializeConfig;
  events: IEventMeta[];
  pageStates: any;
};

class TenonSDKPage {
  private SDKKey?: string;
  public pageInfo: Ref<ITenonWebSDKPageInfo> = ref({} as any);
  public emitter = new Subscribe();
  private app: TenonWebSDK;
  private pageInfoCache: Map<string, ITenonWebSDKPageInfo> = new Map;
  constructor(app: TenonWebSDK) {
    this.app = app;
  }

  async changePage(pageId: string) {
    this.app.renderer.setLoading();
    const pageInfo = await this.getPageInfoFromRemote(pageId);
    this.pageInfo.value = pageInfo;
    console.log('changed!!!!');
    
    this.emitter.emit(SDKPageEvents.PageInfo_Changed, this.pageInfo);
  }

  setSDKKey(key: string) {
    this.SDKKey = key;
  }

  async getPageInfoFromRemote(pageId) {
    if (!this.SDKKey) return console.error('SDKKey is not set');
    if(this.pageInfoCache.has(pageId)) return this.pageInfoCache.get(pageId);
    const res = await (
      await fetch(`${this.app.config.mode === 'prod' ? 'https://doctorwu.club/tenonbff/' : 'http://localhost:9847/'}getSDKPageInfo?pageId=${pageId}&SDKKey=${this.SDKKey}`)
    ).json();
    this.pageInfoCache.set(pageId, cloneDeep(res));
    return res;
  }
}

export default TenonSDKPage;