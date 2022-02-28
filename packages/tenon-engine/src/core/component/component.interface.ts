import { IEventsConfig } from "../events";
import { IMaterial } from "@tenon/materials";
import { ISchema } from "../schema";
import { ITenonComponentStates, TenonComponentStates } from "../states";

export interface ComponentTreeNode {
  name: string; // 组件名称
  id: number; // 组件id
  schemas: ISchema[]; // 组件schemas
  // refs: any; // 引用
  // events: IEventsConfig; // 组件事件
  // handlers: string[];
  parent?: ComponentTreeNode; // 组件父级
  // refKey?: string;
  ctx?: any;
  // textID?: string;
  parentComponent?: ComponentTreeNode;
  props?: any;
  // states?: ITenonComponentStates;
  children?: ComponentTreeNode[];
  material?: IMaterial;
  slots: Object;
  isSlot?: boolean;
}

export interface ComponentSerializeConfig {
  id: number;
  name: string;
  schemas: ISchema[];
  props: any;
  children?: ComponentSerializeConfig[];
  slots: Object;
  states: any;
}