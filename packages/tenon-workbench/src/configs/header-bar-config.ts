import { VNode } from "vue";

export type HeaderBarConfig = IHeaderBarItem[];

export enum HeaderBarType {
  Info = 'Info',
  Operator = 'Operator',
  // ListTree = 'ListTree',
};

export interface IHeaderBarBaseItem<BarType extends HeaderBarType> {
  name: any;
  type: BarType,
  hidden?: boolean;
};

export interface IHeaderBarInfoItem extends IHeaderBarBaseItem<HeaderBarType.Info> {
  render: () => VNode;
};

export interface IHeaderBarOperatorItem extends IHeaderBarBaseItem<HeaderBarType.Operator> {
  popupText?: string;
  iconName?: string;
  listTree?: IListTree[];
  render?: () => VNode;
};

export interface IListTree{
  name: string;
  hidden?: boolean;
  disabled?: boolean;
  text?: string;
  render?: () => VNode;
  children?: IListTree[];
};

export type IHeaderBarItem = IHeaderBarInfoItem | IHeaderBarOperatorItem;