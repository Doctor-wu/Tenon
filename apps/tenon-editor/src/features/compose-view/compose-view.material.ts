import {
  BaseMaterial, IMaterialEventMeta, MaterialPropsType,
  clickTrigger, doubleClickTrigger, internalMeta, TenonEventPrefix,
} from "@tenon/materials";
import { h } from "vue";
import composeViewVue from "./components/compose-view.vue";
import { IComposeViewFeature } from "./compose-view.interface";
import { Bridge } from "@tenon/shared";
import { RuntimeComponentTree } from "../runtime-component-tree";

const TenonComposeViewInfo = {
  name: 'ComposeView',
  icon: 'app',
  description: '[原子组件] 提供组合视图的能力',
  props: {
    style: {
      type: MaterialPropsType.StyleSheet,
      default: {
        color: '#777',
      },
      name: '样式',
    },
  },
  eventMeta: [
    {
      name: 'onClick',
      desc: '点击事件',
      trigger: clickTrigger,
    },
    {
      name: 'onDoubleClick',
      desc: '双击事件',
      trigger: doubleClickTrigger,
    }
  ] as IMaterialEventMeta[],
}

export class TenonComposeView extends BaseMaterial {
  public name = TenonComposeViewInfo.name;
  public icon = TenonComposeViewInfo.icon;
  public description = TenonComposeViewInfo.description;
  public propMeta = TenonComposeViewInfo.props;
  public nestable = true;
  public eventMeta = [...internalMeta, ...TenonComposeViewInfo.eventMeta];

  private composeViewHandler: IComposeViewFeature;
  constructor(
    composeViewHandler: IComposeViewFeature,
  ) {
    super();
    this.composeViewHandler = composeViewHandler;
    if (!this.composeViewHandler) {
      console.log('composeViewHandler is null', this);
    }
  }

  public render(props: {
    [K in keyof TenonComposeView["propMeta"]]: TenonComposeView["propMeta"][K]["type"];
  } & {
    children: RuntimeComponentTree[];
    runtimeTree: RuntimeComponentTree;
    bridge: Bridge<Record<`${typeof TenonEventPrefix}${string}`, any>>;
  }) {
    const { children, runtimeTree, ...withoutChildrenProps } = props;
    const setProps = {
      ...withoutChildrenProps,
      ...this.getInternalProps(),
      runtimeTree,
      bridge: props.bridge,
      composeViewHandler: this.composeViewHandler,
      isEmpty: children.length === 0,
    };
    // @ts-ignore
    return h(composeViewVue, setProps, () => {
      // console.log(`render children, host: ${runtimeTree.id}`, children);
      return children.map((child) => {
        return child.render({ key: child.id });
      });
    });
  }
}
