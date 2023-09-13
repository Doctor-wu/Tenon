import { FootBarAlignment, FootBarConfig } from "@tenon/workbench";
import { h } from "vue";
import FullScreen from "vue-material-design-icons/FullScreen.vue";

export enum FootBarName {
  FullScreen = 'FullScreen',
};

export const footBarConfig: FootBarConfig = {
  config: [
    {
      name: FootBarName.FullScreen,
      alignment: FootBarAlignment.Right,
      icon: {
        iconRender: () => h(FullScreen, {
          size: 24,
        }),
      },
      popupText: '全屏',
    }
  ],
}
