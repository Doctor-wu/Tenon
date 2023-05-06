import { h } from "vue";
import { BaseMaterial, IMaterialEventMeta, MaterialPropsType } from "../../../base-component";
import TextComponent from "./Text.vue";
import { clickTrigger, doubleClickTrigger } from "../../../events";
import { Bridge } from "@tenon/shared";

export class TenonText extends BaseMaterial {
  public name = 'TenonText';
  public icon = 'app';
  public description = '[原子组件] 提供文本能力';
  public bridge = new Bridge();
  public props = {
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
  };

  public eventMeta: IMaterialEventMeta[] = [
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
  ];

  public render(props: {
    [K in keyof TenonText["props"]]: TenonText["props"][K]["type"];
  }) {
    const setProps = {
      ...props,
      __tenon_material_instance__: this,
      __tenon_event_meta__: this.eventMeta,
      __trigger_tenon_event__: (name: string, ...args: any[]) => {
        this.bridge.run(name, ...args);
      },
    };
    return h(TextComponent, setProps);
  }
}
