import { ISchema, ComponentTreeNode } from "@tenon/engine";


export interface IMaterialConfig {
  [props: string]: {
    [props: string]: IMaterialMeta;
  }
};

export interface IMaterialMeta {
  view: IViewConfig;
  logic: any;
  config: any;
  doc: any;
};

export interface IMaterial {
  name: string;
  config: any;
  schemas: any;
  component: any;
}

export interface IViewConfig {
  children: (IViewConfig | string)[];
  props: any;
  el: string;
  type: string;
}