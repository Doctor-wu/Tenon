import { IEventsConfig } from "./events";
import { ISchema } from "./schema";

export interface ComponentTreeNode {
  name: string;
  id: number;
  schemas: any;
  parent: ComponentTreeNode | null;
  refs: any;
  events: IEventsConfig;
  handlers: string[];
  refKey?: string;
  ctx?: any;
  textID?: string;
  parentComponent?: ComponentTreeNode;
  material?: IMaterialConfig;
  props?: any;
  states?: any;
  children?: ComponentTreeNode[];
  slots: Object;
  isSlot?: boolean;
}

export interface IMaterialConfig {
  name: string;
  component: any;
  config: any;
  schemas?: ISchema[];
  children?: IMaterialConfig[];
  tenonComp?: ComponentTreeNode;
}