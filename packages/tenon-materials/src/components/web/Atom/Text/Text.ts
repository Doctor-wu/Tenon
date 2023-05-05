import { h } from "vue";
import { BaseMaterial, MaterialPropsType } from "../../../base-component";
import TextComponent from "./Text.vue";

export class TenonText extends BaseMaterial {
  public name = 'text';
  public icon = 'text';
  public description = '文本';
  public props = {
    text: {
      type: MaterialPropsType.String,
      default: '文本',
      name: '文本',
    },
    style: {
      type: MaterialPropsType.StyleSheet,
      default: {
        color: 'red',
      },
      name: '样式',
    },
  };
  public render(props: {
    [K in keyof TenonText["props"]]: TenonText["props"][K]["type"];
  }) {
    return h(TextComponent, props);
  }
}
