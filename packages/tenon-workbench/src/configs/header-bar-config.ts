import { VNode } from "vue";
import { IconConfig } from "./icon";
import { IListTree } from "./list-tree";

export enum HeaderBarType {
  Info = 'Info',
  Operator = 'Operator',
  // ListTree = 'ListTree',
};

export interface IHeaderBarBaseItem<BarType extends HeaderBarType> {
  name: any;
  type: BarType,
  hidden?: boolean;
  style?: Record<string, string | number>;
};

export interface IHeaderBarInfoItem extends IHeaderBarBaseItem<HeaderBarType.Info> {
  render: () => VNode;
};

export interface IHeaderBarOperatorItem extends IHeaderBarBaseItem<HeaderBarType.Operator> {
  popupText?: string;
  icon?: IconConfig;
  listTree?: IListTree[];
  render?: () => VNode;
};


export type HeaderBarItemType = IHeaderBarInfoItem | IHeaderBarOperatorItem;

export type HeaderBarConfig = {
  config: HeaderBarItemType[];
};