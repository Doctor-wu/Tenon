import { awaitLoad, IDynamicFeature, Loader, Service } from "../decorators";
import { Singleton } from '@tenon/shared';
import { createServiceTag, ContextServiceCore, EventEmitterService, EventEmitterCore } from "../services";
import { HeaderBarConfig, IHeaderBarItem } from "./header-bar-config";
import { ToolBarConfig } from "./tool-bar-config";
import { IDynamicLoader } from "../core";

export * from "./header-bar-config";
export * from "./tool-bar-config";

export const BarService = createServiceTag('BarService');

@Service({
  name: BarService,
})
@Singleton
export class BarConfig {
  actionMap: Map<any, { [props: string]: Function[] }> = new Map;

  contextService = new ContextServiceCore();
  
  @Loader(EventEmitterService)
  eventEmitter: IDynamicFeature<EventEmitterCore>;

  constructor(
    private headerBarConfigInit: HeaderBarConfig,
    private toolBarConfigInit: ToolBarConfig,
  ) {
    this.init();
  }

  init() {
    this.contextService.set('barConfig', {
      headerBarConfig: this.headerBarConfigInit,
      toolBarConfig: this.toolBarConfigInit,
    });
  }

  get headerBarConfig() {
    return this.contextService.get('barConfig').headerBarConfig;
  }

  get toolBarConfig() {
    return this.contextService.get('barConfig').toolBarConfig;
  }

  @awaitLoad(EventEmitterService)
  regisAction(name: any, action: string, cb: Function) {
    this.eventEmitter.instance?.emit('barConfig regisAction');
    if (!this.actionMap.get(name)) {
      this.actionMap.set(name, {
        [action]: [cb],
      });
    } else {
      this.actionMap.get(name)![action].push(cb);
    }
  }

  @awaitLoad(EventEmitterService)
  emitAction(name: any, action: string, ...args: any[]) {
    this.eventEmitter.instance?.emit('barConfig emitAction');
    if (!this.actionMap.get(name)) return;
    this.actionMap.get(name)![action].forEach(cb => {
      cb(...args);
    });
  }

  @awaitLoad(EventEmitterService)
  updateUIConfig(name: any, bar: 'headerBarConfig' | 'toolBarConfig', partial: Partial<IHeaderBarItem>) {
    this.eventEmitter.instance?.emit('barConfig updateUIConfig', name);
    if (bar === 'headerBarConfig') {
      const idx = this[bar].findIndex(config => config.name === name);
      if (idx === -1) {
        return console.error('updateUIConfig failed, config', name, 'is not exist');
      };
      Object.assign(this[bar][idx], partial);
    } else if (bar === 'toolBarConfig') {
      const idxGroup = this[bar].config.findIndex(group => group.some(item => item.name === name));
      if (idxGroup === -1) {
        return console.error('updateUIConfig failed, config Group', name, 'is not exist');
      };
      const idxItem = this[bar].config[idxGroup].findIndex(item => item.name === name);
      if (idxItem === -1) {
        return console.error('updateUIConfig failed, config', name, 'is not exist');
      };
      Object.assign(this[bar].config[idxGroup][idxItem], partial);
    };
  }
}