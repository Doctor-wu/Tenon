import { defineAsyncComponent, h } from "vue";
import { clickTrigger, doubleClickTrigger } from "../../../../events";
import { IMaterialEventMeta, internalMeta } from "../../../../events/event-meta";
import { MaterialPropsType, BaseMaterial } from "../../../base-material";
import { ModelHost, ModelImpl, RenderResultType, RendererHost } from "@tenon/engine";
import { TextboxIcon } from "tdesign-icons-vue-next";
import React, { Fragment, Suspense as ReactSuspense, createElement } from "react";

const TenonTextInfo = {
  name: 'TenonText',
  formatName: '文本',
  icon: () => h(TextboxIcon),
  description: '[原子组件] 提供文本能力',
  props: {
    text: {
      type: MaterialPropsType.String,
      default: '占位文字(生产环境不会渲染)',
      name: '文本',
    },
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

export class TenonText extends BaseMaterial<RendererHost.React | RendererHost.Vue> {
  public name = TenonTextInfo.name;
  public formatName = TenonTextInfo.formatName;
  public icon = TenonTextInfo.icon;
  public description = TenonTextInfo.description;
  public propMeta = TenonTextInfo.props;
  public supportRenderHost = [RendererHost.Vue, RendererHost.React];
  public eventMeta = [...internalMeta, ...TenonTextInfo.eventMeta];
  private AsyncComponentVue;
  private AsyncComponentReact;

  public render<R extends RendererHost.React | RendererHost.Vue>(
    type: R,
    model: ModelImpl[ModelHost],
    props: {
      [K in keyof TenonText["propMeta"]]: TenonText["propMeta"][K]["type"];
    },
  ) {
    const setProps = {
      ...props,
      ...this.getInternalProps(),
      bridge: model.bridge,
    };
    switch (type) {
      case RendererHost.React:
        return this.renderInReact(model, setProps);
      case RendererHost.Vue:
        return this.renderInVue(model, setProps);
      default:
        return `unknown renderer type: ${type}`;
    }
  }

  private renderInVue(model: ModelImpl[ModelHost], props: {
    [K in keyof TenonText["propMeta"]]: TenonText["propMeta"][K]["type"];
  }): RenderResultType[RendererHost.Vue] {
    this.AsyncComponentVue = this.AsyncComponentVue || defineAsyncComponent({
      loader: () => import("./Text.vue"),
      loadingComponent: {
        render: this.renderLoadingVue,
      },
      errorComponent: {
        render: this.renderErrorVue,
      },
    });
    return h(this.AsyncComponentVue, {
      ...props,
      ...this.getInternalProps(),
      bridge: model.bridge,
    });
  }

  private renderInReact(model: ModelImpl[ModelHost], props: {
    [K in keyof TenonText["propMeta"]]: TenonText["propMeta"][K]["type"];
  }): RenderResultType[RendererHost.React] {
    this.AsyncComponentReact = this.AsyncComponentReact || React.lazy(() => import("./Text.react")
      .then(({ TextReact }) => {
        return {
          default: TextReact,
        }
      }));
    return createElement(
      ReactSuspense,
      {
        fallback: this.renderLoadingReact(),
      }, [createElement(this.AsyncComponentReact, {
        ...props,
        ...this.getInternalProps(),
        bridge: model.bridge,
      })]
    );
  }
}
