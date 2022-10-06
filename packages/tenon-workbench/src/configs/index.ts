import { Service } from "../decorators";
import { Singleton } from '@tenon/shared';
import { createServiceTag, ContextServiceCore } from "../services";
import { HeaderBarConfig, IHeaderBarItem } from "./header-bar-config";

export * from "./header-bar-config";

export const BarService = createServiceTag('BarService');

@Service({
  name: BarService,
})
@Singleton
export class BarConfig {
  actionMap: Map<any, { [props: string]: Function[] }> = new Map;

  contextService = new ContextServiceCore();

  constructor(
    private headerBarConfigInit: HeaderBarConfig,
  ) {
    this.init();
  }

  init() {
    this.contextService.set('barConfig', {
      headerBarConfig: this.headerBarConfigInit,
    });
  }

  get headerBarConfig() {
    return this.contextService.get('barConfig').headerBarConfig;
  }

  regisAction(name: any, action: string, cb: Function) {
    if (!this.actionMap.get(name)) {
      this.actionMap.set(name, {
        [action]: [cb],
      });
    } else {
      this.actionMap.get(name)![action].push(cb);
    }
  }

  emitAction(name: any, action: string, ...args: any[]) {
    if (!this.actionMap.get(name)) return;
    this.actionMap.get(name)![action].forEach(cb => {
      cb(...args);
    });
  }

  updateUIConfig(name: any, partial: Partial<IHeaderBarItem>) {
    const idx = this.headerBarConfig.findIndex(config => config.name === name);
    if (idx === -1) {
      return console.error('updateUIConfig failed, config', name, 'is not exist');
    };
    Object.assign(this.headerBarConfig[idx], partial);
  }
}