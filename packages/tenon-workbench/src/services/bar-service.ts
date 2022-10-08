import { Singleton } from '@tenon/shared';
import { awaitLoad, IDynamicFeature, Loader, Service } from "../decorators";
import { createServiceTag, ContextServiceCore, EventEmitterService, EventEmitterCore } from "../services";
import { HeaderBarConfig, HeaderBarType, IHeaderBarItem } from "../configs/header-bar-config";
import { ToolBarConfig, ToolBarConfigType, ToolBarFlag } from "../configs/tool-bar-config";
import { IListTree } from "../configs/list-tree";
import { WorkbenchEvents } from "../core";

export const BarService = createServiceTag('BarService');

@Service({
  name: BarService,
})
@Singleton
export class BarConfig {
  actionMap: Map<any, { [props: string]: Function[] }> = new Map;
  headerBarNameMap: Map<any, IHeaderBarItem> = new Map;
  toolbarNameMap: Map<any, ToolBarConfigType> = new Map;

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
    this.recursiveHeaderBar(this.headerBarConfig);
    this.recursiveToolBar(this.toolBarConfig);
  }

  private recursiveHeaderBar(configs: HeaderBarConfig) {
    configs.forEach(config => {
      this.headerBarNameMap.set(config.name, config);
      if (config.type === HeaderBarType.Operator && config.listTree) {
        this.recursiveListTree(config.listTree, this.headerBarNameMap);
      }
    });
  }

  private recursiveToolBar(configs: ToolBarConfig) {
    configs.config.forEach(group => {
      group.forEach(config => {
        this.toolbarNameMap.set(config.name, config);
        if (config.flag === ToolBarFlag.DropDown && config.listTree) {
          this.recursiveListTree(config.listTree, this.toolbarNameMap);
        }
      })
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

  @awaitLoad(EventEmitterService)
  regisAction(name: any, action: string, cb: Function) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.regisAction, name, action);
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
    this.eventEmitter.instance?.emit(WorkbenchEvents.emitAction, name, action, ...args);
    if (!this.actionMap.get(name)) return;
    this.actionMap.get(name)![action].forEach(cb => {
      cb(...args);
    });
  }

  @awaitLoad(EventEmitterService)
  updateHeaderBarConfig(name: any, partial: Partial<IHeaderBarItem>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateHeaderBarConfig, name, partial);
    const config = this.headerBarNameMap.get(name);
    if (!config) {
      return console.error('updateHeaderBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config || {}, partial);
  }

  @awaitLoad(EventEmitterService)
  updateToolBarConfig(name: any, partial: Partial<ToolBarConfigType>) {
    this.eventEmitter.instance?.emit(WorkbenchEvents.updateToolBarConfig, name, partial);
    const config = this.toolbarNameMap.get(name);
    if (!config) {
      return console.error('updateToolBarConfig failed, config', name, 'is not exist');
    };
    Object.assign(config || {}, partial);
  }
}