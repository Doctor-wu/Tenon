import { h } from "vue";
import { BaseMaterial, IMaterialEventMeta, MaterialPropsType } from "../../../base-component";
import TextComponent from "./Text.vue";
import { clickTrigger, doubleClickTrigger } from "../../../events";
import { Bridge } from "@tenon/shared";
import { internalMeta } from "../../../events/internal-meta";

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
        color: 'orange',
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
  public props = TenonTextInfo.props;

  public eventMeta = [...internalMeta, ...TenonTextInfo.eventMeta];

  public render(props: {
    [K in keyof TenonText["props"]]: TenonText["props"][K]["type"];
  }) {
    const setProps = {
      ...props,
      ...this.getInternalProps(),
    };
    return h(TextComponent, setProps);
  }
}
