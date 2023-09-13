import {
  BaseMaterial, IMaterialEventMeta, MaterialPropsType,
  clickTrigger, doubleClickTrigger, internalMeta, TenonEventPrefix,
} from "@tenon/materials";
import { h } from "vue";
import composeViewVue from "./components/compose-view.vue";
import { IComposeViewFeature } from "./compose-view.interface";
import { Bridge } from "@tenon/shared";
import { RuntimeTreeNode } from "../runtime-component-tree";
import { Logger } from "@/utils/logger";
import type { RendererManager } from "@/core/renderer";

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
  private rendererManager: RendererManager;
  constructor(
    composeViewHandler: IComposeViewFeature,
    rendererManager: RendererManager,
  ) {
    super();
    this.composeViewHandler = composeViewHandler;
    this.rendererManager = rendererManager;
    if (!this.composeViewHandler) {
      Logger.log('composeViewHandler is null', this);
    }
  }

  public render(model: RuntimeTreeNode, props: {
    [K in keyof TenonComposeView["propMeta"]]: TenonComposeView["propMeta"][K]["type"];
  }) {
    const { children } = model;
    const setProps = {
      ...props,
      ...this.getInternalProps(),
      runtimeTree: model,
      bridge: model.bridge,
      composeViewHandler: this.composeViewHandler,
      isEmpty: children.length === 0,
    };
    // @ts-ignore
    return h(composeViewVue, setProps, () => {
      // console.log(`render children, host: ${runtimeTree.id}`, children);
      return children.map((child) => {
        const renderer = this.rendererManager.getRenderer(child.name);
        return renderer.render(child, { key: child.id });
      });
    });
  }
}
