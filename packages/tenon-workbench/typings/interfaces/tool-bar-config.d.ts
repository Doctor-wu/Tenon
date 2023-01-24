import { CSSProperties, VNode } from "vue";
import { IconConfig } from "./icon";
import { IListTree } from "./list-tree";
export declare enum ToolBarFlag {
    /** 开关作用 */
    Switch = "Switch",
    /** 按钮作用 */
    Button = "Button",
    /** 下拉列表作用 */
    DropDown = "DropDown"
}
export interface IToolBarBaseConfig<Flag extends ToolBarFlag> {
    name: any;
    flag: Flag;
    text?: string;
    hidden?: boolean;
    disabled?: boolean;
    popupText?: string | ((config: any) => string);
    icon?: IconConfig;
    loading?: boolean;
}
export interface IToolBarSwitchConfig extends IToolBarBaseConfig<ToolBarFlag.Switch> {
    popupText?: string | ((config: IToolBarSwitchConfig) => string);
    active: boolean;
    activeStyle?: CSSProperties;
    deActiveStyle?: CSSProperties;
}
export interface IToolBarButtonConfig extends IToolBarBaseConfig<ToolBarFlag.Button> {
    popupText?: string | ((config: IToolBarButtonConfig) => string);
}
export interface IToolBarDropDownConfig extends IToolBarBaseConfig<ToolBarFlag.DropDown> {
    popupText?: string | ((config: IToolBarDropDownConfig) => string);
    listTree: IListTree[];
    dropDownRender?: () => VNode;
    dropDownWidth?: string;
}
export declare type ToolBarItemType = IToolBarButtonConfig | IToolBarSwitchConfig | IToolBarDropDownConfig;
export declare type ToolBarConfig = {
    config: ToolBarItemType[][];
    alignment: 'left' | 'center' | 'right';
};
