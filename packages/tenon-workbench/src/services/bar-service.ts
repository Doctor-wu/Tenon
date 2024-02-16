import { Singleton } from '@tenon/shared';
import { awaitLoad, IDynamicFeature, Loader, Service } from "../decorators";
import { createServiceTag, ContextServiceCore, EventEmitterService, EventEmitterCore } from "../services";
import { HeaderBarConfig, HeaderBarType, HeaderBarItemType } from "../interfaces/header-bar-config";
import { ToolBarConfig, ToolBarItemType, ToolBarFlag } from "../interfaces/tool-bar-config";
import { IListTree } from "../interfaces/list-tree";
import { WorkbenchEvents } from "../core";
import { ActionFrom } from './action-info-service';
import { FootBarConfig, FootBarItemType, IToolBarBaseConfig } from '../interfaces';

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

  public init() {
    this.contextService.set('barConfig', {
      headerBarConfig: this.headerBarConfigInit,
      toolBarConfig: this.toolBarConfigInit,
      footBarConfig: this.footBarConfigInit,
    });
    this.resolveHeaderBar(this.headerBarConfig);
    this.resolveToolBar(this.toolBarConfig);
    this.resolveFootBarConfig(this.footBarConfig);
  }

  public setSwitchActive(switchName: string, active: boolean) {
    const config = this.toolBarNameMap.get(switchName);
    if (config && config.flag === ToolBarFlag.Switch) {
      config.active = active;
    }
  }

  public getSwitchActive(switchName: string) {
    const config = this.toolBarNameMap.get(switchName);
    if (config && config.flag === ToolBarFlag.Switch) {
      return config.active;
    }
    return false;
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

  async setToolBarItemLoading(name: any, loading: boolean) {
    this.updateToolBarConfig(name, {
      loading,
      disabled: loading,
    });
  }

  @awaitLoad(EventEmitterService)
  updateHeaderBarConfig(name: any, partial: Partial<HeaderBarItemType>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateHeaderBarConfig, name, partial);
    const config = this.headerBarNameMap.get(name);
    if (!config) {
      return console.error('updateHeaderBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config, partial);
  }

  @awaitLoad(EventEmitterService)
  updateToolBarConfig<
    Config extends IToolBarBaseConfig<ToolBarFlag> = ToolBarItemType
  >(name: any, partial: Partial<Config>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateToolBarConfig, name, partial);
    const config = this.toolBarNameMap.get(name);
    if (!config) {
      return console.error('updateToolBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config, partial);
  }

  @awaitLoad(EventEmitterService)
  updateFootBarConfig(name: any, partial: Partial<FootBarItemType>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateFootBarConfig, name, partial);
    const config = this.footBarNameMap.get(name);
    if (!config) {
      return console.error('updateFootBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config, partial);
  }
}
