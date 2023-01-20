import { CSSProperties, VNode } from "vue";
import { IconConfig } from "./icon";
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
  icon?: IconConfig;
};


export interface IToolBarSwitchConfig extends IToolBarBaseConfig<ToolBarFlag.Switch> {
  active: boolean;
  activeStyle?: CSSProperties;
  deActiveStyle?: CSSProperties;
};

export interface IToolBarButtonConfig extends IToolBarBaseConfig<ToolBarFlag.Button> {
};

export interface IToolBarDropDownConfig extends IToolBarBaseConfig<ToolBarFlag.DropDown> {
  listTree: IListTree[];
  dropDownRender?: () => VNode;
  dropDownWidth?: string;
};

export type ToolBarItemType = IToolBarButtonConfig | IToolBarSwitchConfig | IToolBarDropDownConfig;

export type ToolBarConfig = {
  config: ToolBarItemType[][];
  alignment: 'left' | 'center' | 'right';
};
