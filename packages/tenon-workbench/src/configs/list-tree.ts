import { VNode } from "vue";

export interface IListTree{
  name: string;
  hidden?: boolean;
  disabled?: boolean;
  text?: string;
  render?: () => VNode;
  children?: IListTree[];
};