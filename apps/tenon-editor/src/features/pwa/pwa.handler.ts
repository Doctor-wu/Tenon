import {
  Feature
} from "@tenon/workbench";
import NotificationPlugin from "tdesign-vue-next/es/notification/plugin";
import "tdesign-vue-next/es/notification/style/index.css";
import NotificationFooter from "./components/notification-footer.vue";
import { IPwaFeature } from "./pwa.interface";
import { Ref, h, watch } from "vue";
import { Bridge } from "@tenon/shared";
import { Logger } from "@/utils/logger";
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/vue';
// @ts-ignore
import { pwaInfo } from 'virtual:pwa-info';

@Feature({
  name: IPwaFeature,
})
export class PwaHandler implements IPwaFeature {
  public offlineReady?: Ref<boolean>;
  public needRefresh?: Ref<boolean>;
  public bridge = new Bridge<{
    onOfflineReady: () => void;
    onNeedRefresh: () => void;
  }>();
  private updateServiceWorkerHandler?: () => void;

  public initPWA() {
    const {
      offlineReady,
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW({})

    this.needRefresh = needRefresh;
    this.offlineReady = offlineReady;
    this.updateServiceWorkerHandler = updateServiceWorker;
    this.initEvent();
  }

  get pwaInfo() {
    return pwaInfo;
  }

  private initEvent() {
    this.bridge.register('onNeedRefresh', async () => {
      Logger.info('[PWA] onNeedRefresh');
      const {
        close
      } = await NotificationPlugin.info({
        placement: 'bottom-right',
        title: '发现新版本',
        content: '新版本已准备好, 点击刷新按钮升级',
        duration: 0,
        footer: () => h(NotificationFooter, {
          updateServiceWorker: this.updateServiceWorkerHandler!,
          onClose: () => {
            close();
          }
        }),
      })
    });
    watch(this.offlineReady!, (val) => {
      if (val) {
        this.bridge.run('onOfflineReady');
      }
    });
    watch(this.needRefresh!, (val) => {
      if (val) {
        this.bridge.run('onNeedRefresh');
      }
    });
  }
}
