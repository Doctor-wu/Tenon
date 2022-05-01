import { Subscribe } from "@tenon/shared";
import { ComponentSerializeConfig, IEventMeta } from "@tenon/engine";
import { reactive } from "vue";

enum SDKPageEvents {
  PageInfo_Changed = "pageInfo_changed",
}

export interface ITenonWebSDKPageInfo {
  pageName: string;
  tree: ComponentSerializeConfig;
  events: IEventMeta[];
  pageStates: any;
};

class TenonSDKPage {
  private SDKKey?: string;
  public pageInfo!: ITenonWebSDKPageInfo;
  public emitter = new Subscribe();

  async changePage(pageId: string) {
    const pageInfo = await this.getPageInfoFromRemote(pageId);
    this.pageInfo = reactive(pageInfo);
    console.log('changed!!!!');
    
    this.emitter.emit(SDKPageEvents.PageInfo_Changed, this.pageInfo);
  }

  setSDKKey(key: string) {
    this.SDKKey = key;
  }

  async getPageInfoFromRemote(pageId) {
    if (!this.SDKKey) return console.error('SDKKey is not set');
    const res = await (await fetch(`/getSDKPageInfo?pageId=${pageId}&SDKKey=${this.SDKKey}`)).json();
    return res;
  }

}

export default TenonSDKPage;