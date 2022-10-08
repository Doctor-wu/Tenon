import { VNode } from "vue";
import { IListTree } from "./list-tree";

export enum ToolBarFlag {
  /** 开关作用 */
  Switch = 'Switch',
  /** 按钮作用 */
  Button = 'Button',
  /** 下拉列表作用 */
  DropDown = 'DropDown',
};

export interface IToolBarBaseConfig<Flag extends ToolBarFlag> {
  name: any;
  flag: Flag;
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

export interface IToolBarSwitchConfig extends IToolBarBaseConfig<ToolBarFlag.Switch> {
  active: boolean;
};

export interface IToolBarButtonConfig extends IToolBarBaseConfig<ToolBarFlag.Button> {
};

export interface IToolBarDropDownConfig extends IToolBarBaseConfig<ToolBarFlag.DropDown> {
  listTree?: IListTree[];
  dropDownRender?: () => VNode;
  dropDownWidth?: string;
};

export type ToolBarConfigType = IToolBarButtonConfig | IToolBarSwitchConfig | IToolBarDropDownConfig;

export type ToolBarConfig = {
  config: ToolBarConfigType[][];
  alignment: 'left' | 'center' | 'right';
};
