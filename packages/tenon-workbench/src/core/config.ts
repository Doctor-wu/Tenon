import { Subscribe } from "@tenon/shared";
import { reactive, UnwrapNestedRefs, VNode, VueElement } from "vue";

export type HeaderBarConfig = IHeaderBarItem[];

export enum IHeaderBarType {
  Info = 'Info',
  Operator = 'Operator',
};

export interface IHeaderBarBaseItem<BarType extends IHeaderBarType> {
  name: string;
  type: BarType,
};

export interface IHeaderBarInfoItem extends IHeaderBarBaseItem<IHeaderBarType.Info> {
  render: () => VNode;
}

export interface IHeaderBarOperatorItem extends IHeaderBarBaseItem<IHeaderBarType.Operator> {
  popupText?: string;
  iconName?: string;
  subConfigs?: IHeaderBarOperatorItem[];
  render?: () => VNode;
}

export type IHeaderBarItem = IHeaderBarInfoItem | IHeaderBarOperatorItem;


export class BarConfig {
  actionMap: Map<any, { [props: string]: Function[] }> = new Map;
  config: UnwrapNestedRefs<{
    headerBarConfig: HeaderBarConfig;
  }>;

  constructor(
    headerBarConfig: HeaderBarConfig,
  ) {
    this.config = reactive({
      headerBarConfig,
    });
  }

  get headerBarConfig() {
    return this.config.headerBarConfig;
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
    const idx = this.config.headerBarConfig.findIndex(config => config.name === name);
    if (idx === -1) {
      return console.error('updateUIConfig failed, config', name, 'is not exist');
    }; 
    Object.assign(this.config.headerBarConfig[idx], partial);
  }
}
