import { VNode } from "vue";
import { IconConfig } from "./icon";
export interface IListTree {
    name: string;
    hidden?: boolean;
    disabled?: boolean;
    text?: string;
    render?: () => VNode;
    children?: IListTree[];
    icon?: IconConfig;
}
