import { VNode } from "vue";
import { IListTree } from "./header-bar-config";

export interface IToolBarBaseConfig {
  name: any;
  flag: number;
  text?: string;
  hidden?: boolean;
  disabled?: boolean;
  popupText?: string;
  icon?: IToolBarIconConfig;
};

export interface IToolBarIconConfig {
  iconName?: string;
  iconRender?: () => VNode;
  iconSize?: number;
}

export interface IToolBarSwitchConfig extends IToolBarBaseConfig {
  switchStatus?: boolean;
};

export interface IToolBarButtonConfig extends IToolBarBaseConfig {

};

export interface IToolBarDropDownConfig extends IToolBarBaseConfig {
  listTree?: IListTree[];
  dropDownRender?: () => VNode;
  dropDownWidth?: string;
};

export type ToolBarConfigType = IToolBarButtonConfig & IToolBarSwitchConfig & IToolBarDropDownConfig;

export type ToolBarConfig = {
  config: ToolBarConfigType[][];
  alignment: 'left' | 'center' | 'right';
};

export const ToolBarFlag = {
  /** 开关作用 */
  Switch: 1 << 0,
  /** 按钮作用 */
  Button: 1 << 1,
  /** 下拉列表作用 */
  DropDown: 1 << 2,
};