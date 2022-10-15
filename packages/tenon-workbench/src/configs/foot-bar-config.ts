import { VNode } from "vue";
import { IconConfig } from "./icon";

export enum FootBarAlignment {
  Left = 'Left',
  Right = 'Right',
};

export interface IFootBarItem {
  name: any;
  alignment: FootBarAlignment;
  popupText: string;
  hidden?: boolean;
  icon?: IconConfig;
  text?: string;
  render?: () => VNode;
};


export type FootBarItemType = IFootBarItem;

export type FootBarConfig = {
  config: FootBarItemType[];
};