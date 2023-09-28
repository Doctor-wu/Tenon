import {
  BaseMaterial, IMaterialEventMeta, MaterialPropsType,
  clickTrigger, doubleClickTrigger, internalMeta,
} from "@tenon/materials";
import { h } from "vue";
import composeViewVue from "./components/compose-view.vue";
import { IComposeViewFeature } from "./compose-view.interface";
import { IRuntimeComponentTreeFeature } from "../runtime-component-tree";
import { Logger } from "@/utils/logger";
import type { RendererManager } from "@/core/renderer";
import { IRenderer, ModelImpl, ModelHost, RendererHost, RenderResultType } from "@tenon/engine";
import { createElement } from "react";
import { ComposeViewReact } from "./components/compose-view.react";

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

export class TenonComposeView
  extends BaseMaterial<RendererHost.Vue | RendererHost.React>
  implements IRenderer<ModelHost, RendererHost.Vue | RendererHost.React> {
  public name = TenonComposeViewInfo.name;
  public icon = TenonComposeViewInfo.icon;
  public description = TenonComposeViewInfo.description;
  public propMeta = TenonComposeViewInfo.props;
  public nestable = true;
  public eventMeta = [...internalMeta, ...TenonComposeViewInfo.eventMeta];
  public supportRenderHost = [RendererHost.Vue, RendererHost.React];

  private composeViewHandler: IComposeViewFeature;
  private rendererManager: RendererManager;
  private runtimeComponentTreeHandler: IRuntimeComponentTreeFeature;
  constructor(
    composeViewHandler: IComposeViewFeature,
    rendererManager: RendererManager,
    runtimeComponentTreeHandler: IRuntimeComponentTreeFeature,
  ) {
    super();
    this.composeViewHandler = composeViewHandler;
    this.rendererManager = rendererManager;
    if (!this.composeViewHandler) {
      Logger.log('composeViewHandler is null', this);
    }
  }

  public render<R extends RendererHost.Vue | RendererHost.React>(
    type: R,
    model: ModelImpl[ModelHost.Tree],
    props: {
      [K in keyof TenonComposeView["propMeta"]]: TenonComposeView["propMeta"][K]["type"];
    }): RenderResultType[R] {
    const { children } = model;
    const setProps = {
      key: model.id,
      ...props,
      ...this.getInternalProps(),
      runtimeTree: model,
      bridge: model.bridge,
      composeViewHandler: this.composeViewHandler,
      isEmpty: children.length === 0,
    };
    const renderResult = (() => {
      switch (type) {
        case RendererHost.React:
          return createElement(ComposeViewReact, setProps, children.map((child) => {
            const renderer = this.rendererManager.getRenderer(child.name);
            return renderer.render(type, child, { key: child.id });
          })) as RenderResultType[R];
        case RendererHost.Vue:
          return h(composeViewVue, setProps, () => {
            return children.map((child) => {
              const renderer = this.rendererManager.getRenderer(child.name);
              return renderer.render(type, child, { key: child.id });
            });
          }) as RenderResultType[R];
        default:
          return h(composeViewVue, setProps, () => {
            return children.map((child) => {
              const renderer = this.rendererManager.getRenderer(child.name);
              return renderer.render(type, child, { key: child.id });
            });
          }) as RenderResultType[R];
      }
    })();
    return renderResult;
  }
}
