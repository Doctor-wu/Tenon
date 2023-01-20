import { VNode } from "vue";

export interface IconConfig {
  iconName?: string;
  iconRender?: () => VNode;
  iconSize?: number;
}