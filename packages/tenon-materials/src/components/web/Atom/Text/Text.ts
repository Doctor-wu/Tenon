import { h } from "vue";
import { BaseMaterial, MaterialPropsType } from "../../../base-material";
import TextComponent from "./Text.vue";
import { clickTrigger, doubleClickTrigger } from "../../../events";
import { IMaterialEventMeta, internalMeta } from "../../../events/event-meta";
import { Bridge } from "@tenon/shared";

const TenonTextInfo = {
  name: 'TenonText',
  icon: 'app',
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

export class TenonText extends BaseMaterial {
  public name = TenonTextInfo.name;
  public icon = TenonTextInfo.icon;
  public description = TenonTextInfo.description;
  public propMeta = TenonTextInfo.props;

  public eventMeta = [...internalMeta, ...TenonTextInfo.eventMeta];

  public render(props: {
    [K in keyof TenonText["propMeta"]]: TenonText["propMeta"][K]["type"];
  } & {
    bridge: Bridge<Record<`tenon-event:${string}`, any>>;
  }) {
    const setProps = {
      ...props,
      ...this.getInternalProps(),
      bridge: props.bridge,
    };
    return h(TextComponent, setProps);
  }
}
