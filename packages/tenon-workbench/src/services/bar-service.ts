import { Singleton } from '@tenon/shared';
import { awaitLoad, IDynamicFeature, Loader, Service } from "../decorators";
import { createServiceTag, ContextServiceCore, EventEmitterService, EventEmitterCore } from "../services";
import { HeaderBarConfig, HeaderBarType, HeaderBarItemType } from "../configs/header-bar-config";
import { ToolBarConfig, ToolBarItemType, ToolBarFlag } from "../configs/tool-bar-config";
import { IListTree } from "../configs/list-tree";
import { WorkbenchEvents } from "../core";
import { ActionFrom } from './action-info-service';
import { FootBarConfig, FootBarItemType } from '../configs';

export const BarService = createServiceTag('BarService');

@Service({
  name: BarService,
})
@Singleton
export class BarServiceCore {
  actionMap: Map<any, { [props: string]: Function[] }> = new Map;
  headerBarNameMap: Map<any, HeaderBarItemType> = new Map;
  toolBarNameMap: Map<any, ToolBarItemType> = new Map;
  footBarNameMap: Map<any, FootBarItemType> = new Map;

  contextService = new ContextServiceCore();

  @Loader(EventEmitterService)
  eventEmitter: IDynamicFeature<EventEmitterCore>;

  constructor(
    private headerBarConfigInit: HeaderBarConfig,
    private toolBarConfigInit: ToolBarConfig,
    private footBarConfigInit: FootBarConfig,
  ) {
    this.init();
  }

  init() {
    this.contextService.set('barConfig', {
      headerBarConfig: this.headerBarConfigInit,
      toolBarConfig: this.toolBarConfigInit,
      footBarConfig: this.footBarConfigInit,
    });
    this.resolveHeaderBar(this.headerBarConfig);
    this.resolveToolBar(this.toolBarConfig);
    this.resolveFootBarConfig(this.footBarConfig);
  }

  private resolveHeaderBar(configs: HeaderBarConfig) {
    configs.config.forEach(config => {
      this.headerBarNameMap.set(config.name, config);
      if (config.type === HeaderBarType.Operator && config.listTree) {
        this.recursiveListTree(config.listTree, this.headerBarNameMap);
      }
    });
  }

  private resolveToolBar(configs: ToolBarConfig) {
    configs.config.forEach(group => {
      group.forEach(config => {
        this.toolBarNameMap.set(config.name, config);
        if (config.flag === ToolBarFlag.DropDown && config.listTree) {
          this.recursiveListTree(config.listTree, this.toolBarNameMap);
        }
      })
    });
  }

  private resolveFootBarConfig(configs: FootBarConfig) {
    configs.config.forEach(config => {
      this.footBarNameMap.set(config.name, config);
    });
  }

  private recursiveListTree(listTree: IListTree[], map: Map<any, any>) {
    listTree.forEach(tree => {
      map.set(tree.name, tree);
      if (tree.children) {
        this.recursiveListTree(tree.children, map);
      };
    });
  }

  get headerBarConfig(): HeaderBarConfig {
    return this.contextService.get('barConfig').headerBarConfig;
  }

  get toolBarConfig(): ToolBarConfig {
    return this.contextService.get('barConfig').toolBarConfig;
  }

  get footBarConfig(): FootBarConfig {
    return this.contextService.get('barConfig').footBarConfig;
  }

  @awaitLoad(EventEmitterService)
  regisAction(name: any, action: string, cb: Function) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.regisAction, name, action);
    if (!this.actionMap.get(name)) {
      this.actionMap.set(name, {});
    }
    if (!this.actionMap.get(name)?.[action]) {
      this.actionMap.get(name)![action] = [];
    }
    this.actionMap.get(name)![action].push(cb);
  }

  @awaitLoad(EventEmitterService)
  async emitAction(name: any, action: string, from: ActionFrom, ...args: any[]) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.emitAction, {
      name, action, from,
    });
    if (this.actionMap.get(name)) {
      const cbs = this.actionMap.get(name)![action];
      if (cbs) {
        for (let index = 0; index < cbs.length; index++) {
          const cb = cbs[index];
          await cb(...args);
        }
      }
    }
    this.eventEmitter.instance?.emit(WorkbenchEvents.emitActionFinish, {
      name, action, from,
    });
  }

  @awaitLoad(EventEmitterService)
  updateHeaderBarConfig(name: any, partial: Partial<HeaderBarItemType>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateHeaderBarConfig, name, partial);
    const config = this.headerBarNameMap.get(name);
    if (!config) {
      return console.error('updateHeaderBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config || {}, partial);
  }

  @awaitLoad(EventEmitterService)
  updateToolBarConfig(name: any, partial: Partial<ToolBarItemType>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateToolBarConfig, name, partial);
    const config = this.toolBarNameMap.get(name);
    if (!config) {
      return console.error('updateToolBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config || {}, partial);
  }

  @awaitLoad(EventEmitterService)
  updateFootBarConfig(name: any, partial: Partial<FootBarItemType>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateFootBarConfig, name, partial);
    const config = this.footBarNameMap.get(name);
    if (!config) {
      return console.error('updateToolBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config || {}, partial);
  }
}
