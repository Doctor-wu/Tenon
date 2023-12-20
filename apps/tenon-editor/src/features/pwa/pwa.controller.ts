import { IConfig } from "@/core";
import {
  Controller, IDynamicFeature, Inject, Loader, awaitLoad,
} from "@tenon/workbench";
import { IPwaFeature } from "./pwa.interface";
import { BaseConfig } from "../../../config/base";

@Controller({
  name: Symbol('pwa-controller')
})
export class PwaController {

  @Loader(IPwaFeature)
  private IPwaFeatureLoader: IDynamicFeature<IPwaFeature>;

  private get pwaFeature() {
    return this.IPwaFeatureLoader.instance!;
  }

  constructor(
    @Inject(IConfig) private config: BaseConfig,
  ) {
    if (!this.config.isDev) {
      this.init();
    }
  }

  @awaitLoad(IPwaFeature)
  async init() {
    this.pwaFeature.initPWA();
  }
}
